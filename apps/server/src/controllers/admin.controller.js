import { createError } from "../utils/AppError.js";
import * as NominationService from "../services/nomination.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getNominations = async (req, res, next) => {
  try {
    const { search, country } = req.query;

    const data = await NominationService.adminGetAll({ search, country });

    return successResponse(res, data, 200);
  } catch (error) {
    console.log(error);

    if (!error.statusCode) {
      return next(createError("Internal Server Error", 500));
    }

    next(error);
  }
};

export const getNominationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await NominationService.getById(id);

    return successResponse(res, data, 200);
  } catch (error) {
    if (!error.statusCode) {
      return next(createError("Internal Server Error", 500));
    }

    return next(error);
  }
};

export const rejectNomination = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await NominationService.rejectNomination(id);

    return successResponse(res, data, 200);
  } catch (error) {
    if (!error.statusCode) {
      return next(createError("Internal Server Error", 500));
    }

    return next(error);
  }
};

export const approveNomination = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await NominationService.approveNomination(id);

    return successResponse(res, data, 200);
  } catch (error) {
    if (!error.statusCode) {
      return next(createError("Internal Server Error", 500));
    }

    return next(error);
  }
};

export const suspendNomination = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await NominationService.suspendNomination(id);

    return successResponse(res, data, 200);
  } catch (error) {
    if (!error.statusCode) {
      return next(createError("Internal Server Error", 500));
    }

    return next(error);
  }
};
