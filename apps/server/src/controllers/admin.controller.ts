import type { RequestHandler } from "express";
import { createError } from "../utils/AppError.js";
import * as NominationService from "../services/nomination.service.js";
import { successResponse, paginatedResponse } from "../utils/apiResponse.js";

const ALLOWED_SORT_FIELDS = ["created_at", "nominee_name"] as const;
type SortField = (typeof ALLOWED_SORT_FIELDS)[number];

const queryParam = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const isSortField = (value: string): value is SortField =>
  (ALLOWED_SORT_FIELDS as readonly string[]).includes(value);

export const getNominations: RequestHandler = async (req, res, next) => {
  try {
    const search = queryParam(req.query.search);
    const country = queryParam(req.query.country);

    const page = Math.max(1, parseInt(queryParam(req.query.page) ?? "", 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(queryParam(req.query.limit) ?? "", 10) || 15),
    );
    const sort_by = queryParam(req.query.sort_by) ?? "created_at";
    const sort_order = queryParam(req.query.sort_order) ?? "desc";

    if (!isSortField(sort_by)) {
      return next(
        createError(
          `Invalid sort_by value. Allowed values: ${ALLOWED_SORT_FIELDS.join(", ")}`,
          400,
        ),
      );
    }

    if (sort_order !== "asc" && sort_order !== "desc") {
      return next(
        createError("Invalid sort_order value. Allowed values: asc, desc", 400),
      );
    }

    const { nominations, total } = await NominationService.adminGetAll({
      search,
      country,
      page,
      limit,
      sort_by,
      sort_order,
    });

    const total_pages = Math.ceil(total / limit);

    return paginatedResponse(res, nominations, {
      total,
      page,
      limit,
      total_pages,
      has_next_page: page < total_pages,
      has_prev_page: page > 1,
    });
  } catch (error) {
    next(error);
  }
};

export const getNominationById: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await NominationService.getById(id);

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};

export const rejectNomination: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await NominationService.rejectNomination(id);

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};

export const approveNomination: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await NominationService.approveNomination(id);

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};

export const suspendNomination: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await NominationService.suspendNomination(id);

    return successResponse(res, data, 200);
  } catch (error) {
    next(error);
  }
};
