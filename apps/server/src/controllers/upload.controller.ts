import type { RequestHandler } from "express";
import { createError } from "../utils/AppError.js";
import { successResponse } from "../utils/apiResponse.js";
import * as UtilsService from "../services/utils.service.js";

export const uploadImage: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError("No file uploaded", 400);
    }

    const data = await UtilsService.upload(req.file);

    return successResponse(res, data, 201);
  } catch (error) {
    next(error);
  }
};
