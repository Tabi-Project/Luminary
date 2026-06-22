import { endpoints } from "@/data/endpoints";
import { ErrorApiResponse, Response } from "@/types/api.type";
import { UploadedFile } from "@/types/nomination.type";
import { axiosPost } from "@/utils/api";
import { isErrorApiResponse } from "@/utils/error";

export class UploadService {
  static async uploadPhoto(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosPost<Response<UploadedFile>>(
        endpoints.upload,
        formData,
        { config: { headers: { "Content-Type": "multipart/form-data" } } },
      );

      if (!("data" in response)) throw response as ErrorApiResponse;

      return response;
    } catch (error) {
      if (isErrorApiResponse(error)) throw error;

      throw error;
    }
  }
}
