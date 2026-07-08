import type { RequestHandler } from "express";
import { NominationStatus } from "../lib/nominations.js";
import * as nominationService from "../services/nomination.service.js";
import { successResponse } from "../utils/apiResponse.js";

const queryParam = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

export const createNomination: RequestHandler = async (req, res, next) => {
  try {
    const data = await nominationService.create(req.body ?? {});

    return successResponse(res, data, 201);
  } catch (error) {
    next(error);
  }
};

export const getNominations: RequestHandler = async (req, res, next) => {
  try {
    const search = queryParam(req.query.search);
    const country = queryParam(req.query.country);

    const data = await nominationService.getAll({ search, country });

    return successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

export const getNominationById: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await nominationService.getById(id);

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};

export const consentApproval: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nomination } = req.body ?? {};

    const data = await nominationService.update(
      { ...nomination, status: NominationStatus.CONSENT_GRANTED },
      id,
    );

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};

export const consentRejection: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await nominationService.update(
      { status: NominationStatus.CONSENT_REJECTED },
      id,
    );

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};
