export interface SuccessApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedSuccessApiResponse<T> extends Omit<
  SuccessApiResponse<T>,
  "data"
> {
  data: {
    data: T[];
    meta: PaginationMeta;
  };
}

export interface ErrorApiResponse {
  error: string | string[];
  message: string;
}

export type Response<T> = T extends unknown[]
  ? PaginatedSuccessApiResponse<T> | ErrorApiResponse
  : SuccessApiResponse<T> | ErrorApiResponse;

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
