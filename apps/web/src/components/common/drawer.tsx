"use client";

import { cn } from "@/utils/cn";
import { Drawer as BaseDrawer } from "@base-ui/react";
import { ReactNode } from "react";

interface DrawerProps {
  open?: boolean;
  children: ReactNode;
  trigger?: ReactNode;
  triggerClassName?: string;
  footer?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  className?: string;
  setOpen?: (open: boolean) => void;
}

export function Drawer({
  open,
  children,
  trigger,
  triggerClassName,
  footer,
  title,
  description,
  className,
  setOpen,
}: DrawerProps) {
  return (
    <BaseDrawer.Root open={open} onOpenChange={setOpen}>
      {trigger && (
        <BaseDrawer.Trigger className={triggerClassName}>
          {trigger}
        </BaseDrawer.Trigger>
      )}
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="fixed inset-0 z-50 bg-black/30 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <BaseDrawer.Popup
          className={cn(
            "fixed inset-x-0 bottom-0 z-51 flex max-h-[85vh] flex-col gap-4 rounded-t-xl bg-white p-4 shadow-lg outline-none",
            "translate-y-[var(--drawer-swipe-movement-y)] transition-transform duration-200 ease-out",
            "data-ending-style:translate-y-full data-starting-style:translate-y-full data-swiping:transition-none",
            className,
          )}
        >
          <div className="mx-auto h-1.5 w-12 shrink-0 rounded-full bg-border" />

          {(title || description) && (
            <div className="flex flex-col gap-1">
              {title && (
                <BaseDrawer.Title className="text-lg font-semibold text-text-main">
                  {title}
                </BaseDrawer.Title>
              )}
              {description && (
                <BaseDrawer.Description className="text-sm leading-relaxed text-muted">
                  {description}
                </BaseDrawer.Description>
              )}
            </div>
          )}

          <div className="flex flex-col gap-4 overflow-y-auto">{children}</div>

          {footer}
        </BaseDrawer.Popup>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
