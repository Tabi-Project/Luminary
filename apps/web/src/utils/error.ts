import { ErrorApiResponse } from "@/types/api.type";

const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again.";

export function isErrorApiResponse(error: unknown): error is ErrorApiResponse {
  return typeof error === "object" && error !== null && "error" in error;
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (error && typeof error === "object") {
    const response = error as Partial<ErrorApiResponse>;

    if (Array.isArray(response.error)) return response.error.join(", ");
    if (typeof response.error === "string") return response.error;
    if (typeof response.message === "string") return response.message;
  }

  return FALLBACK_ERROR_MESSAGE;
}
