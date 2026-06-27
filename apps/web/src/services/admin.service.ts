import { endpoints } from "@/data/endpoints";
import { SuccessApiResponse } from "@/types/api.type";
import { NominationDetail } from "@/types/nomination-detail.type";
import { axiosGet, axiosPatch } from "@/utils/api";
import { getAuthToken } from "@/utils/auth";

function authConfig() {
  const token = getAuthToken();
  return {
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export class AdminService {
  static async GetNominations(
    search: string,
    page: number,
    sort_by: string,
    sort_order: string,
  ) {
    const response = await axiosGet(endpoints.admin.nominations.getNominations, {
      params: { search, page, sort_by, sort_order },
      ...authConfig(),
    });

    return response as SuccessApiResponse<any[]>;
  }

  static async GetNominationById(id: string) {
    const response = await axiosGet(
      endpoints.admin.nominations.getById(id),
      authConfig(),
    );

    return response as SuccessApiResponse<NominationDetail>;
  }

  static async ApproveNomination(id: string) {
    const response = await axiosPatch(
      endpoints.admin.nominations.approve(id),
      undefined,
      authConfig(),
    );

    return response as SuccessApiResponse<unknown>;
  }

  static async RejectNomination(id: string) {
    const response = await axiosPatch(
      endpoints.admin.nominations.reject(id),
      undefined,
      authConfig(),
    );

    return response as SuccessApiResponse<unknown>;
  }

  static async SuspendNomination(id: string) {
    const response = await axiosPatch(
      endpoints.admin.nominations.suspend(id),
      undefined,
      authConfig(),
    );

    return response as SuccessApiResponse<unknown>;
  }
}