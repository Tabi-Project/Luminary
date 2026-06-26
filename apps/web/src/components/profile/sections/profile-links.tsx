import { ProfileLinksProps } from "@/types/profile.type";
import Link from "next/link";

export function ProfileLinks({ title, links }: ProfileLinksProps) {
  if (links.length === 0) return null;

  return (
    <section aria-label={title} className="mt-12 flex flex-col">
      <h2 className="pb-4 text-primary">{title}</h2>

      <div className="flex flex-wrap gap-4">
        {links.map((link) => (
          <Link
            key={link}
            href={link.startsWith("http") ? link : `https://${link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-transparent bg-bg-surface px-2 py-0.5 text-sm text-text-main transition-colors hover:bg-primary/40"
          >
            {link.replace(/^https?:\/\//, "")}
          </Link>
        ))}
      </div>
    </section>
  );
}
