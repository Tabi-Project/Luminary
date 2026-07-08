import type { RequestHandler } from "express";
import * as CategoriesService from "../services/categories.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const data = await CategoriesService.getAll();

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};
