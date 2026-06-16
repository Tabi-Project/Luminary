import { successResponse } from "../utils/apiResponse.js";
import { createError } from "../utils/AppError.js";
import * as UtilsService from "../services/utils.service.js";

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError("No file uploaded", 400);
    }

    const data = await UtilsService.upload(req.file);

    return successResponse(res, data, 201);
  } catch (error) {
    if (!error.statusCode) {
      return next(createError("Internal Server Error", 500));
    }

    return next(error);
  }
};
