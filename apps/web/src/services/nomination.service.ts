import { endpoints } from "@/data/endpoints";
import { UploadService } from "@/services/upload.service";
import { ErrorApiResponse, Response } from "@/types/api.type";
import {
  NominationFormState,
  NominationPayload,
  NominationTab,
} from "@/types/nomination.type";
import { axiosPost } from "@/utils/api";
import { isErrorApiResponse } from "@/utils/error";
import { splitName } from "@/utils/string";

export class NominationService {
  private static toPayload(
    state: NominationFormState,
    tab: NominationTab,
    imageUrl: string,
  ): NominationPayload {
    const isSelfSubmission = tab === "self-submission";
    const { firstName, lastName } = splitName(state.nominee.fullName);

    const payload: NominationPayload = {
      is_self_submission: isSelfSubmission,
      nominee_first_name: firstName,
      nominee_last_name: lastName,
      nominee_email: state.nominee.email.trim(),
      nominee_country: state.nominee.region.trim(),
      nominee_field: state.nominee.field,
      nominee_organization: "",
      nominee_profile_image_url: imageUrl,
      evidence_urls: state.evidenceLinks
        .map((link) => link.trim())
        .filter(Boolean),
      supporting_urls: state.supportingLinks
        .map((link) => link.trim())
        .filter(Boolean),
      description: state.nominee.description.trim(),
    };

    if (!isSelfSubmission) {
      const { firstName: nominatorFirst, lastName: nominatorLast } = splitName(
        state.nominator.fullName,
      );

      payload.nominator_first_name = nominatorFirst;
      payload.nominator_last_name = nominatorLast;
      payload.nominator_email = state.nominator.email.trim();
      payload.relationship_to_nominee = state.nominator.relationship.trim();
    }

    return payload;
  }

  static async create(state: NominationFormState, tab: NominationTab) {
    try {
      const upload = await UploadService.uploadPhoto(state.photo as File);

      const payload = this.toPayload(state, tab, upload.data.url);

      const response = await axiosPost<Response<unknown>>(
        endpoints.nomination.create,
        payload,
      );

      if (!("data" in response)) throw response as ErrorApiResponse;

      return response;
    } catch (error) {
      if (isErrorApiResponse(error)) throw error;

      throw error;
    }
  }
}
