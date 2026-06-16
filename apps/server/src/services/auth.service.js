import { supabaseAdmin } from "../config/supabase.js";
import { createError } from "../utils/AppError.js";

export const login = async (loginDetails) => {
  try {
    const { data: loginData, error } =
      await supabaseAdmin.auth.signInWithPassword(loginDetails);

    if (error) {
      throw createError(error.message, 401);
    }

    const { user, session } = loginData;

    return {
      user: {
        id: user.id,
        email: user.email,
        role: "admin",
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      token: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      },
    };
  } catch (error) {
    console.log(error);

    if (error.statusCode) {
      throw error;
    }

    throw createError("Internal Server Error", 500);
  }
};
