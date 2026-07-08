import type { RequestHandler } from "express";
import { verifyAccessToken } from "../lib/jwt.js";

export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token.",
    });
  }
};
