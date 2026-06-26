import { NomineeProfile, ApiNomination } from "@/types/profile.type";
import { SuccessApiResponse, ErrorApiResponse } from "@/types/api.type";
import { axiosGet } from "@/utils/api";
import { endpoints } from "@/data/endpoints";


export const getApprovedProfiles = async (): Promise<NomineeProfile[] | ErrorApiResponse> => {
  try {
    const response = await axiosGet<SuccessApiResponse<ApiNomination[]>>(endpoints.nomination.get, {});
    
    if (!response.success) {
      return {
        error: "API_UNSUCCESSFUL",
        message: response.message || "Failed to fetch approved profiles from the API."
      };
    }

    return response.data
      .filter((item) => item.status === "approved")
      .map((item) => {

        let evidence = JSON.parse(item.evidence_urls);

        return {
          id: item.nominee.id.toString(),
          firstname: item.nominee.first_name,
          lastname: item.nominee.last_name,
          field: item.nominee.field,
          region: item.nominee.country,
          impact: item.description,
          tags: [item.nominee.field, item.nominee.country],
          profilePhoto: item.nominee.profile_image_url,
          socialLinks: item.supporting_urls,
          evidence: evidence,
        };
      });
  } catch (error) {
    console.error("Error fetching approved profiles:", error);
    
    if (error && typeof error === 'object' && ('message' in error || 'error' in error)) {
      return error as ErrorApiResponse;
    }

    return {
      error: "FETCH_FAILED",
      message: error instanceof Error ? error.message : "An unexpected connection error occurred."
    };
  }
};
