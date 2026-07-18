import { NomineeProfile } from "@/types/profile.type";
import { ApiNomination } from "@/types/nomination.type";
import { SuccessApiResponse, ErrorApiResponse } from "@/types/api.type";
import { axiosGet } from "@/utils/api";
import { endpoints } from "@/data/endpoints";
import { getApiErrorMessage } from "@/utils/error";
import { toNomineeProfile } from "@/utils/profile";

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
