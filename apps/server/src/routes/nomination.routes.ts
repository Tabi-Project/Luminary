import { Router } from "express";
import {
  consentApproval,
  consentRejection,
  createNomination,
  getNominationById,
  getNominations,
} from "../controllers/nomination.controller.js";

const router = Router();

router.get("/", getNominations);
router.post("/", createNomination);
router.get("/:id", getNominationById);
router.patch("/:id/consent/approve", consentApproval);
router.patch("/:id/consent/reject", consentRejection);

export default router;
