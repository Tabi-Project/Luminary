import multer from "multer";
import { Router } from "express";
import { createError } from "../utils/AppError.js";
import { uploadImage } from "../controllers/upload.controller.js";

const router = Router();

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(createError("Invalid file type", 400));
    }
  },
});

router.post("/", upload.single("file"), uploadImage);

export default router;
