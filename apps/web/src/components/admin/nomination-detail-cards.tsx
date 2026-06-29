import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5 rounded-lg border border-border bg-white p-6">
      <h2 className="text-lg font-bold text-text-main">{title}</h2>
      {children}
    </section>
  );
}

export function Field({
  label,
  value,
  className,
}: {
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className={`text-sm text-text-main ${className ?? ""}`}>
        {value || "--"}
      </span>
    </div>
  );
}

export function LinkList({
  label,
  links,
  emptyText,
  labelFor,
}: {
  label: string;
  links: string[];
  emptyText: string;
  labelFor: (url: string, index: number) => string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      {links.length === 0 ? (
        <span className="text-sm text-muted">{emptyText}</span>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {links.map((url, i) => (
            <li key={i}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                {labelFor(url, i)}
                <ExternalLink size={13} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}