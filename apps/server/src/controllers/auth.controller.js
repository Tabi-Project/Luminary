import * as authService from "../services/auth.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const loginHandler = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};
