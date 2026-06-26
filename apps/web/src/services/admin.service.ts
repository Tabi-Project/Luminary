import { endpoints } from "@/data/endpoints";
import { SuccessApiResponse } from "@/types/api.type";
import { axiosGet } from "@/utils/api";
import { getAuthToken } from "@/utils/auth";

export class AdminService {
  static async GetNominations() {
    const token = getAuthToken();

    const response = await axiosGet(
      endpoints.admin.nominations.getNominations,
      {
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    );

    return response as SuccessApiResponse<any[]>;
  }
}
