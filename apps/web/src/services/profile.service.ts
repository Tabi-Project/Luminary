import { NomineeProfile, ApiNomination } from "@/types/profile.type";
import { SuccessApiResponse, ErrorApiResponse } from "@/types/api.type";
import { axiosGet } from "@/utils/api";
import { endpoints } from "@/data/endpoints";
import { getApiErrorMessage } from "@/utils/error";

// URLs are stored inconsistently (a JSON-encoded string for evidence, a real
// array for supporting links), so normalize both into a string[] safely.
const toUrlArray = (value: string | string[] | null | undefined): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || value.trim() === "") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [value];
  } catch {
    return [value];
  }
};

const toNomineeProfile = (item: ApiNomination): NomineeProfile => ({
  id: item.id.toString(),
  firstname: item.nominee.first_name,
  lastname: item.nominee.last_name,
  field: item.nominee.field,
  region: item.nominee.country,
  organization: item.nominee.organization,
  impact: item.description,
  tags: [item.nominee.field, item.nominee.country],
  profilePhoto: item.nominee.profile_image_url,
  socialLinks: toUrlArray(item.supporting_urls),
  evidence: toUrlArray(item.evidence_urls),
});

export const getApprovedProfiles = async (): Promise<
  NomineeProfile[] | ErrorApiResponse
> => {
  try {
    const response = await axiosGet<SuccessApiResponse<ApiNomination[]>>(
      endpoints.nomination.get,
      { params: { status: "approved" } },
    );

    if (!response.success) {
      return {
        error: "API_UNSUCCESSFUL",
        message:
          response.message || "Failed to fetch approved profiles from the API.",
      };
    }

    return response.data.map(toNomineeProfile);
  } catch (error) {
    console.error("Error fetching approved profiles:", error);

    return {
      error: "FETCH_FAILED",
      message: getApiErrorMessage(error),
    };
  }
};

export const getProfileById = async (
  id: string,
): Promise<NomineeProfile | ErrorApiResponse> => {
  try {
    const response = await axiosGet<SuccessApiResponse<ApiNomination>>(
      `${endpoints.nomination.get}/${id}`,
      {},
    );

    if (!response.success) {
      return {
        error: "API_UNSUCCESSFUL",
        message: response.message || "Failed to fetch the profile from the API.",
      };
    }

    return toNomineeProfile(response.data);
  } catch (error) {
    console.error("Error fetching profile:", error);

    return {
      error: "FETCH_FAILED",
      message: getApiErrorMessage(error),
    };
  }
};
