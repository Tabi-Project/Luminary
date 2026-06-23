"use client";

import { Drawer } from "@/components/common/drawer";
import { VERIFICATION_STEPS } from "@/data/constants/nomination";
import { ShieldCheck } from "lucide-react";

function VerificationContent() {
  return (
    <>
      <ol className="flex flex-col gap-3 rounded-lg bg-bg-surface p-3">
        {VERIFICATION_STEPS.map((step, index) => (
          <li key={step.title} className="flex items-start gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
              {index + 1}
            </span>
            <article className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-text-main">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </article>
          </li>
        ))}
      </ol>

      <article className="flex flex-col gap-1 rounded-lg bg-bg-surface p-3">
        <h3 className="text-sm font-semibold text-text-main">Self Submission</h3>
        <p className="text-sm leading-relaxed text-muted">
          If you are submitting your own profile, the consent step is
          automatically bypassed, making the process faster.
        </p>
      </article>
    </>
  );
}

export function VerificationSidebar() {
  return (
    <>
      <aside className="hidden w-full flex-col gap-4 rounded-xl border border-border bg-white p-4 lg:flex lg:sticky lg:top-20 lg:max-w-xs">
        <h2 className="text-lg font-semibold text-text-main">
          Verification Workflow
        </h2>

        <VerificationContent />
      </aside>

      <div className="w-full lg:hidden">
        <Drawer
          title="Verification Workflow"
          trigger={
            <>
              <ShieldCheck className="size-4" />
              <span>Verification Workflow</span>
            </>
          }
          triggerClassName="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white p-3 text-sm font-semibold text-text-main shadow-sm"
        >
          <VerificationContent />
        </Drawer>
      </div>
    </>
  );
}
