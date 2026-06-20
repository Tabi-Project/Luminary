import { ErrorApiResponse } from "@/types/api.type";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again.";

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

const instance: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Please Remember to write the logout function
    }

    return Promise.reject(error);
  },
);

export async function axiosGet<T = unknown>(
  url: string,
  {
    params,
    config,
  }: {
    params?: Record<string, unknown>;
    config?: AxiosRequestConfig;
  },
) {
  try {
    const response = await instance.get<T>(url, { params, ...config });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data as ErrorApiResponse;
    }

    throw error;
  }
}

export async function axiosPost<T = unknown>(
  url: string,
  payload?: unknown,
  { config }: { config?: AxiosRequestConfig } = {},
) {
  try {
    const response = await instance.post<T>(url, payload, config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data as ErrorApiResponse;
    }

    throw error;
  }
}

export async function axiosPatch<T = unknown>(
  url: string,
  payload?: unknown,
  { config }: { config?: AxiosRequestConfig } = {},
) {
  try {
    const response = await instance.patch<T>(url, payload, config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data as ErrorApiResponse;
    }

    throw error;
  }
}

export async function axiosDelete<T = unknown>(
  url: string,
  { config }: { config?: AxiosRequestConfig } = {},
) {
  try {
    const response = await instance.delete<T>(url, config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data as ErrorApiResponse;
    }

    throw error;
  }
}
