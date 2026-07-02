import { Router } from "express";
import authRoutes from "./auth.route.js";
import adminRoutes from "./admin.route.js";
import uploadRoutes from "./upload.route.js";
import { authenticate } from "../middleware/auth.js";
import nominationRoutes from "./nomination.routes.js";
import categoriesRoutes from "./categories.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);
router.use("/nomination", nominationRoutes);
router.use("/admin", authenticate, adminRoutes);
router.use("/categories", categoriesRoutes);

export default router;
