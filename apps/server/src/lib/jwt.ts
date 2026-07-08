import jwt from "jsonwebtoken";
import { AdminTokenPayload } from "../types/jwt.type.js";

const ACCESS_TOKEN_TTL = "1h";
const REFRESH_TOKEN_TTL = "7d";

const getAccessSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable.");
  }

  return secret;
};

const getRefreshSecret = (): string =>
  process.env.JWT_REFRESH_SECRET || getAccessSecret();

export const signAccessToken = (admin: { id: string; email: string }): string =>
  jwt.sign(
    { email: admin.email, role: "admin", type: "access" },
    getAccessSecret(),
    {
      subject: admin.id,
      expiresIn: ACCESS_TOKEN_TTL,
    },
  );

export const signRefreshToken = (admin: {
  id: string;
  email: string;
}): string =>
  jwt.sign(
    { email: admin.email, role: "admin", type: "refresh" },
    getRefreshSecret(),
    {
      subject: admin.id,
      expiresIn: REFRESH_TOKEN_TTL,
    },
  );

const verifyToken = (
  token: string,
  secret: string,
  type: "access" | "refresh",
): AdminTokenPayload => {
  const payload = jwt.verify(token, secret);

  if (
    typeof payload === "string" ||
    payload.type !== type ||
    typeof payload.sub !== "string"
  ) {
    throw new Error("Invalid token payload.");
  }

  return payload as AdminTokenPayload;
};

export const verifyAccessToken = (token: string): AdminTokenPayload =>
  verifyToken(token, getAccessSecret(), "access");

export const verifyRefreshToken = (token: string): AdminTokenPayload =>
  verifyToken(token, getRefreshSecret(), "refresh");
