import { VERIFICATION_STEPS } from "@/data/nomination";

export function VerificationSidebar() {
  return (
    <aside className="flex w-full flex-col gap-4 rounded-xl border border-border bg-white p-4 lg:sticky lg:top-20 lg:max-w-xs">
      <h2 className="text-lg font-semibold text-text-main">
        Verification Workflow
      </h2>

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
    </aside>
  );
}
