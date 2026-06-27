import { endpoints } from "@/data/endpoints";
import { PaginatedSuccessApiResponse } from "@/types/api.type";
import { axiosGet } from "@/utils/api";
import { getAuthToken } from "@/utils/auth";

export class AdminService {
  static async GetNominations(
    search: string,
    page: number,
    sort_by: string,
    sort_order: string,
  ) {
    const token = getAuthToken();

    const response = await axiosGet(
      endpoints.admin.nominations.getNominations,
      {
        params: { search, page, sort_by, sort_order },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    );

    return response as PaginatedSuccessApiResponse<any[]>;
  }
}
