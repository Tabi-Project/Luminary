import { createError } from "../utils/AppError.js";
import * as CategoriesService from "../services/categories.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getCategories = async (req, res, next) => {
  try {
    const data = await CategoriesService.getAll();

    return successResponse(res, data, 200);
  } catch (error) {
    if (!error.statusCode) {
      next(createError("Internal Server Error", 500));
    }

    next(error);
  }
};
