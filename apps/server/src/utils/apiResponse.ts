import type { Response } from "express";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next_page: boolean;
  has_prev_page: boolean;
}

export const successResponse = (
  res: Response,
  data: unknown,
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 500,
) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export const paginatedResponse = (
  res: Response,
  data: unknown,
  meta: PaginationMeta,
) => {
  return res.status(200).json({
    success: true,
    data,
    meta,
  });
};
