import { endpoints } from "@/data/endpoints";
import { ErrorApiResponse, Response } from "@/types/api.type";
import { NominationPayload, UploadedFile } from "@/types/nomination.type";
import { axiosPost } from "@/utils/api";

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
}
