"use client";

import type { ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Ban, Check, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/common/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { AdminService } from "@/services/admin.service";
import { useNominationActions } from "@/hooks/useNominationActions";
import type {
  NominationDetail,
  NominationStatus,
} from "@/types/nomination-detail.type";

const statusStyles: Record<NominationStatus, string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-danger/10 text-danger",
  suspended: "bg-muted/10 text-muted",
};

type Action = "approve" | "reject" | "suspend";

const actionsByStatus: Record<NominationStatus, Action[]> = {
  pending: ["approve", "reject"],
  approved: ["suspend"],
  rejected: ["approve"],
  suspended: ["approve"],
};

function fullName(p?: { first_name?: string; last_name?: string } | null) {
  if (!p) return "";
  return [p.first_name, p.last_name].filter(Boolean).join(" ").trim();
}

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "NA";
}

function formatDate(value?: string) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function NominationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["nomination", id],
    queryFn: () => AdminService.GetNominationById(id),
    enabled: Boolean(id),
  });

  const { trigger, dialog, isPending } = useNominationActions();

  const goBack = () => router.push("/admin");

  if (isLoading) {
    return (
      <div className="py-10">
        <p className="text-sm text-muted">Loading nomination...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-start gap-4 py-10">
        <Button
          variant="ghost"
          icon={<ArrowLeft size={16} />}
          text="Back to nominations"
          onClick={goBack}
          className="w-fit text-muted hover:text-primary"
        />
        <p className="text-sm text-danger">
          {error instanceof Error
            ? error.message
            : "Unable to load this nomination."}
        </p>
      </div>
    );
  }

  const nomination = data.data as NominationDetail;
  const nominee = nomination.nominee;
  const nominator = nomination.nominator ?? null;
  const nomineeName = fullName(nominee) || "Unknown nominee";
  const nominatorName = fullName(nominator);
  const isSelf = nomination.is_self_submission ?? !nominatorName;
  const submissionType = isSelf ? "Self submission" : "Nomination";
  const status = nomination.status;
  const allowed = actionsByStatus[status] ?? [];
  const supportingLinks = (nomination.supporting_urls ?? []).filter(Boolean);
  const evidenceLinks = (nomination.evidence_urls ?? []).filter(Boolean);

  return (
    <div className="flex flex-col gap-6 py-8">
      <Button
        variant="ghost"
        icon={<ArrowLeft size={16} />}
        text="Back to nominations"
        onClick={goBack}
        className="w-fit text-muted hover:text-primary"
      />

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-text-main">
            Reviewing {nomineeName}
          </h1>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {allowed.includes("approve") && (
            <Button
              variant="default"
              icon={<Check size={16} />}
              text="Approve"
              disabled={isPending}
              onClick={() => trigger("approve", nomination.id)}
              className="justify-center"
            />
          )}
          {allowed.includes("reject") && (
            <Button
              variant="ghost"
              icon={<X size={16} />}
              text="Reject"
              disabled={isPending}
              onClick={() => trigger("reject", nomination.id)}
              className="text-danger hover:bg-danger/10"
            />
          )}
          {allowed.includes("suspend") && (
            <Button
              variant="ghost"
              icon={<Ban size={16} />}
              text="Suspend"
              disabled={isPending}
              onClick={() => trigger("suspend", nomination.id)}
              className="text-warning hover:bg-warning/10"
            />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card title="Nominee Information">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                {initials(nomineeName)}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-text-main">
                  {nomineeName}
                </span>
                <span className="text-sm text-muted">
                  {nominee.organization || "Independent / not provided"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Field of work" value={nominee.field} />
              <Field label="Country / Region" value={nominee.country} />
              <Field label="Contact email" value={nominee.email} />
              <Field label="Submission type" value={submissionType} />
            </div>

            <Field
              label="Profile summary"
              value={nominee.description || "No summary available."}
            />

            <LinkList
              label="Supporting links"
              links={supportingLinks}
              emptyText="No supporting links available."
              labelFor={(_, i) => `Supporting link ${i + 1}`}
            />
          </Card>

          <Card title="Impact & Evidence">
            <Field
              label="Description of impact"
              value={nomination.description || "No impact description provided."}
            />
            <LinkList
              label="Evidence links"
              links={evidenceLinks}
              emptyText="No evidence links were submitted."
              labelFor={(url) => hostname(url)}
            />
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card title={isSelf ? "Self Submission Details" : "Nominator Details"}>
            <Field
              label="Submitted by"
              value={nominatorName || "Self submission"}
            />
            <Field
              label="Relationship to nominee"
              value={
                nominator?.relationship_to_nominee ||
                (isSelf ? "Self-submitted" : "Nominator")
              }
            />
            <Field
              label="Email address"
              value={nominator?.email || nominee.email}
            />
          </Card>

          <Card title="Status Overview">
            <Field
              label="Current status"
              value={status}
              className="capitalize"
            />
            <Field
              label="Submitted on"
              value={formatDate(nomination.created_at)}
            />
            <Field
              label="Last updated"
              value={formatDate(nomination.updated_at || nomination.created_at)}
            />
            <Field label="Submission type" value={submissionType} />
          </Card>
        </div>
      </div>

      <ConfirmDialog {...dialog} />
    </div>
  );
}

/* ---- local presentational helpers ---- */

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5 rounded-lg border border-border bg-white p-6">
      <h2 className="text-lg font-bold text-text-main">{title}</h2>
      {children}
    </section>
  );
}

function Field({
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

function LinkList({
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
            <li key={`${url}-${i}`}>
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