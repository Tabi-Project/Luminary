"use client";

import { Modal } from "@/components/common/modal";
import { Button } from "@/components/common/button";

interface ConfirmDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  variant?: "default" | "ghost";
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  setOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  variant = "default",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={title}
      description={description}
      width="sm"
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            text={cancelText}
            disabled={loading}
            onClick={() => setOpen(false)}
            className="text-muted hover:bg-muted/10"
          />
          <Button
            variant={variant}
            text={confirmText}
            loading={loading}
            disabled={loading}
            onClick={onConfirm}
          />
        </div>
      }
    >
      <span className="sr-only">{title}</span>
    </Modal>
  );
}