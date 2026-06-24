import axios from "axios";
import { NomineeProfile } from "@/types/profile.type";

const API_URL = "https://luminary-2lvb.onrender.com/api/nomination";

interface ApiNominee {
  id: number;
  first_name: string;
  last_name: string;
  field: string;
  country: string;
  profile_image_url: string;
}

interface ApiNomination {
  nominee_id: number;
  status: string;
  description: string;
  evidence_urls: string;
  supporting_urls: string[];
  nominee: ApiNominee;
}

interface ApiResponse {
  success: boolean;
  data: ApiNomination[];
}

export const getApprovedProfiles = async (): Promise<NomineeProfile[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);
    
    if (!response.data.success) {
      throw new Error("Failed to fetch profiles");
    }

    return response.data.data
      .filter((item) => item.status === "approved")
      .map((item) => {
        let evidence: string[] = [];
        try {
          evidence = JSON.parse(item.evidence_urls);
        } catch (e) {
          console.error("Error parsing evidence_urls", e);
        }

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
    return [];
  }
};
