import type { RequestHandler } from "express";
import * as authService from "../services/auth.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await authService.login(req.body ?? {});
    console.log(data);
    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};

export const refreshHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await authService.refresh(req.body?.refresh_token);

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};
