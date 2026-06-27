import { createError } from "../utils/AppError.js";
import * as NominationService from "../services/nomination.service.js";
import { successResponse, paginatedResponse } from "../utils/apiResponse.js";

const ALLOWED_SORT_FIELDS = ["created_at", "nominee_name"];

export const getNominations = async (req, res, next) => {
  try {
    const { search, country } = req.query;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 15));
    const sort_by = req.query.sort_by || "created_at";
    const sort_order = req.query.sort_order || "desc";

    if (!ALLOWED_SORT_FIELDS.includes(sort_by)) {
      return next(
        createError(
          `Invalid sort_by value. Allowed values: ${ALLOWED_SORT_FIELDS.join(", ")}`,
          400,
        ),
      );
    }

    if (!["asc", "desc"].includes(sort_order)) {
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
