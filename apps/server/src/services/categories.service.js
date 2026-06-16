import { supabaseAdmin } from "../config/supabase.js";
import { createError } from "../utils/AppError.js";

const CATEGORIES_TABLE_NAME = "categories";

export const getAll = async () => {
  try {
    const { data: categoriesData, error } = await supabaseAdmin
      .from(CATEGORIES_TABLE_NAME)
      .select("*");

    if (error) {
      throw error;
    }

    return categoriesData;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    console.error("Critical Error in getNominations:", error);
    throw createError("Internal Server Error", 500);
  }
};
