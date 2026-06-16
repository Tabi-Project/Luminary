import { NominationStatus } from "../lib/nominations.js";
import * as nominationService from "../services/nomination.service.js";
import { successResponse, paginatedResponse } from "../utils/apiResponse.js";
import { createError } from "../utils/AppError.js";

export const createNomination = async (req, res, next) => {
  try {
    const data = await nominationService.create(req.body);

    return successResponse(res, data, 201);
  } catch (error) {
    next(error);
  }
};

export const getNominations = async (req, res, next) => {
  try {
    const { search, country } = req.query;

    const data = await nominationService.getAll({ search, country });

    return successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

export const getNominationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await nominationService.getById(id);

    return successResponse(res, data, 200);
  } catch (error) {
    if (!error.statusCode) {
      return next(createError("Internal Server Error", 500));
    }

    return next(error);
  }
};

export const consentApproval = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nomination } = req.body;

    const data = await nominationService.update(
      { ...nomination, status: NominationStatus.CONSENT_GRANTED },
      id,
    );

    return successResponse(res, data, 200);
  } catch (error) {
    if (!error.statusCode) {
      return next(createError("Internal Server Error", 500));
    }

    return next(error);
  }
};

export const consentRejection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await nominationService.update(
      { status: NominationStatus.CONSENT_REJECTED },
      id,
    );
    return successResponse(res, data, 200);
  } catch (error) {
    if (!error.statusCode) {
      return next(createError("Internal Server Error", 500));
    }

    return next(error);
  }
};
