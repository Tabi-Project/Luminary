import { endpoints } from "@/data/endpoints";
import { ErrorApiResponse, Response } from "@/types/api.type";
import { AdminLoginData, AdminLoginPayload } from "@/types/auth.type";
import { axiosPost } from "@/utils/api";

export class AuthService {
  static async login(payload: unknown) {
    try {
      const response = await axiosPost<Response<unknown>>(
        endpoints.auth.login,
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

  static async adminLogin(payload: AdminLoginPayload) {
    const response = await axiosPost<Response<AdminLoginData>>(
      endpoints.auth.adminLogin,
      payload,
    );

    if (!("data" in response)) {
      return response as ErrorApiResponse;
    }

    return response;
  }

  static logout() {
    localStorage.removeItem("access_token");
    window.location.replace("/admin/login");
  }
}
