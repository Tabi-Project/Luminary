"use client";

import { Button } from "@/components/common/button";
import { CollapsibleSectionProps } from "@/types/nomination.type";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="flex flex-col gap-4 border-b border-border pb-6 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-main">{title}</h2>
        <Button
          type="button"
          text=""
          aria-expanded={open}
          aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
          onClick={() => setOpen((value) => !value)}
          icon={
            <ChevronDown
              className={cn(
                "size-4 text-muted transition-transform",
                !open && "-rotate-90",
              )}
            />
          }
          className="grid size-8 place-items-center rounded-full bg-transparent p-0 shadow-none hover:bg-bg-surface"
        />
      </div>
      {open && <div className="flex flex-col gap-4">{children}</div>}
    </section>
  );
}
