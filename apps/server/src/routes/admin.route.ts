import { Router } from "express";
import {
  approveNomination,
  getNominationById,
  getNominations,
  rejectNomination,
  suspendNomination,
} from "../controllers/admin.controller.js";

const router = Router();

router.get("/nominations", getNominations);
router.get("/nominations/:id", getNominationById);
router.patch("/nominations/:id/reject", rejectNomination);
router.patch("/nominations/:id/approve", approveNomination);
router.patch("/nominations/:id/suspend", suspendNomination);

export default router;
