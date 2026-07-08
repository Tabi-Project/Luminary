import path from "path";
import { randomUUID } from "crypto";
import { getSupabaseStorageClient } from "../config/supabase.js";
import { createError, rethrowAsAppError } from "../utils/AppError.js";

const EVIDENCE_BUCKET = "nomination_evidence";

export const upload = async (
  file: Express.Multer.File,
): Promise<{ url: string }> => {
  try {
    const supabase = getSupabaseStorageClient();

    const ext = path.extname(file.originalname);
    const fileName = `${randomUUID()}${ext}`;

    const { data, error } = await supabase.storage
      .from(EVIDENCE_BUCKET)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw createError(error.message, 400);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(EVIDENCE_BUCKET).getPublicUrl(data.path);

    return { url: publicUrl };
  } catch (error) {
    return rethrowAsAppError(error, "upload");
  }
};
