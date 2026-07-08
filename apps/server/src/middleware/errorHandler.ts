import type { ErrorRequestHandler, RequestHandler } from "express";
import { createError } from "../utils/AppError.js";

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(createError(`Not Found - ${req.originalUrl}`, 404));
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCodeCandidate = (err as { statusCode?: unknown } | null)
    ?.statusCode;
  const statusCode =
    typeof statusCodeCandidate === "number" ? statusCodeCandidate : 500;
  const message =
    err instanceof Error && err.message ? err.message : "Internal Server Error";
  const stack = err instanceof Error ? err.stack : undefined;

  console.error(`[Error] ${statusCode} - ${message}`);
  if (process.env.NODE_ENV === "development") {
    console.error(stack);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack }),
  });
};
