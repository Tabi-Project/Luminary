import path from "path";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "../config/supabase.js";

export const upload = async (file) => {
  try {
    const ext = path.extname(file.originalname);
    const fileName = `${randomUUID()}${ext}`;

    const { data, error } = await supabaseAdmin.storage
      .from("nomination_evidence")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw createError(error.message, 400);
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage
      .from("nomination_evidence")
      .getPublicUrl(data.path);

    return { url: publicUrl };
  } catch (error) {
    console.log(error);

    if (!error.statusCode) {
      throw createError("Internal Server Error", 500);
    }

    throw error;
  }
};
