import jwt from "jsonwebtoken";

export interface AdminTokenPayload extends jwt.JwtPayload {
  sub: string;
  email: string;
  role: "admin";
  type: "access" | "refresh";
}
