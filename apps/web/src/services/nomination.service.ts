import { endpoints } from "@/data/endpoints";
import { ErrorApiResponse, Response } from "@/types/api.type";
import {
  NominationFormState,
  NominationPayload,
  NominationTab,
  UploadedFile,
} from "@/types/nomination.type";
import { axiosPost } from "@/utils/api";
import { splitName } from "@/utils/string";

function toPayload(
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

export class NominationService {
  static async uploadPhoto(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosPost<Response<UploadedFile>>(
        endpoints.nomination.upload,
        formData,
        { config: { headers: { "Content-Type": "multipart/form-data" } } },
      );

      if (!("data" in response)) {
        return response as ErrorApiResponse;
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload: NominationPayload) {
    try {
      const response = await axiosPost<Response<unknown>>(
        endpoints.nomination.create,
        payload,
      );

      if (!("data" in response)) {
        return response as ErrorApiResponse;
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  static async submit(state: NominationFormState, tab: NominationTab) {
    const upload = await NominationService.uploadPhoto(state.photo as File);

    if ("error" in upload) throw upload;

    const result = await NominationService.create(
      toPayload(state, tab, upload.data.url),
    );

    if ("error" in result) throw result;

    return result;
  }
}
