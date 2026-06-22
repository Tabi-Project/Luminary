"use client";

import { FormLabel } from "@/components/common/form";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "@/data/constants/nomination";
import { PhotoUploadProps } from "@/types/nomination.type";
import Image from "next/image";
import { useEffect } from "react";

export function PhotoUpload({
  id,
  label,
  required,
  value,
  onChange,
}: PhotoUploadProps) {
  const preview = value ? URL.createObjectURL(value) : null;

  useEffect(() => {
    if (!preview) return;

    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <div className="flex flex-col gap-2">
      <FormLabel label={label} htmlFor={id} required={required} />

      <div className="flex items-center gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-border bg-bg-surface">
          {preview && (
            <Image
              src={preview}
              alt="Profile preview"
              fill
              sizes="56px"
              className="object-cover"
              unoptimized
            />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <FormLabel
            label="Upload image"
            htmlFor={id}
            className="w-fit cursor-pointer rounded-full bg-bg-surface px-4 py-2 text-sm font-semibold text-muted hover:text-text-main"
          />
          <input
            id={id}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES}
            className="sr-only"
            onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          />
          <p className="text-xs text-muted">
            .jpg, .png or .webp supported (max {MAX_IMAGE_SIZE_MB}MB)
          </p>
        </div>
      </div>
    </div>
  );
}
