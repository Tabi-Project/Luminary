import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { admins, type Admin } from "../db/schema.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../lib/jwt.js";
import { createError, rethrowAsAppError } from "../utils/AppError.js";

export interface LoginPayload {
  email?: string;
  password?: string;
}

const toAuthResponse = (admin: Admin) => ({
  user: {
    id: admin.id,
    email: admin.email,
    role: "admin" as const,
    created_at: admin.created_at,
    updated_at: admin.updated_at,
  },
  token: {
    access_token: signAccessToken(admin),
    refresh_token: signRefreshToken(admin),
  },
});

export const login = async ({ email, password }: LoginPayload) => {
  try {
    if (!email || !password) {
      throw createError("Email and password are required.", 400);
    }

    const admin = await db.query.admins.findFirst({
      where: eq(admins.email, email.toLowerCase()),
    });

    if (!admin) {
      throw createError("Invalid login credentials", 401);
    }

    const passwordMatches = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatches) {
      console.log("WRONG PASSWORD");
      throw createError("Invalid login credentials", 401);
    }

    return toAuthResponse(admin);
  } catch (error) {
    return rethrowAsAppError(error, "login");
  }
};

export const refresh = async (refreshToken?: string) => {
  try {
    if (!refreshToken) {
      throw createError("Refresh token is required.", 400);
    }

    let adminId: string;
    try {
      adminId = verifyRefreshToken(refreshToken).sub;
    } catch {
      throw createError("Invalid or expired token.", 401);
    }

    const admin = await db.query.admins.findFirst({
      where: eq(admins.id, adminId),
    });

    if (!admin) {
      throw createError("Invalid or expired token.", 401);
    }

    return toAuthResponse(admin);
  } catch (error) {
    return rethrowAsAppError(error, "refresh");
  }
};
