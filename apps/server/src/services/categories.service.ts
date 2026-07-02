import { db } from "../db/index.js";
import { categories, type Category } from "../db/schema.js";
import { rethrowAsAppError } from "../utils/AppError.js";

export const getAll = async (): Promise<Category[]> => {
  try {
    return await db.select().from(categories);
  } catch (error) {
    return rethrowAsAppError(error, "getCategories");
  }
};
