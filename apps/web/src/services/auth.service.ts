import { endpoints } from "@/data/endpoints";
import { ErrorApiResponse, Response } from "@/types/api.type";
import { axiosPost } from "@/utils/api";

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginData {
  token: AuthTokens;
}

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
}