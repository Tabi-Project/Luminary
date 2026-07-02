import { Router } from "express";

import {
  loginHandler,
  refreshHandler,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/admin/login", loginHandler);
router.post("/admin/refresh", refreshHandler);

export default router;
