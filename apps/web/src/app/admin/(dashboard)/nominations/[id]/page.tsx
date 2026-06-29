"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Ban, Check, X } from "lucide-react";
import { Button } from "@/components/common/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import {
  Card,
  Field,
  LinkList,
} from "@/components/admin/nomination-detail-cards";
import { AdminService } from "@/services/admin.service";
import { actionsByStatus, nominationStatusStyles } from "@/data/status";
import { getInitials, toUrlList } from "@/utils/nomination";
import { formatDate } from "@/utils/date";
import type { NominationDetail } from "@/types/nomination.type";

type Action = "approve" | "reject" | "suspend";

const actionRequest: Record<Action, (id: string) => Promise<unknown>> = {
  approve: (id) => AdminService.ApproveNomination(id),
  reject: (id) => AdminService.RejectNomination(id),
  suspend: (id) => AdminService.SuspendNomination(id),
};

const actionCopy: Record<
  Action,
  { title: string; description: string; confirmText: string }
> = {
  approve: {
    title: "Approve nomination",
    description:
      "This will approve the nomination and move it forward in the workflow.",
    confirmText: "Approve",
  },
  reject: {
    title: "Reject nomination",
    description: "This will reject the nomination. The nominee will not be published.",
    confirmText: "Reject",
  },
  suspend: {
    title: "Suspend nomination",
    description: "This will suspend the nomination until it is reviewed again.",
    confirmText: "Suspend",
  },
};

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function NominationDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["nomination", id],
    queryFn: () => AdminService.GetNominationById(id),
    enabled: Boolean(id),
  });

  const [pendingAction, setPendingAction] = useState<Action | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const closeDialog = () => {
    setPendingAction(null);
    setActionError(null);
  };

  const confirmAction = async () => {
    if (!pendingAction) return;

    setActionLoading(true);
    setActionError(null);

    try {
      await actionRequest[pendingAction](id);
      await refetch();
      setPendingAction(null);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setActionLoading(false);
    }
  };

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
        <Link
          href="/admin"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to nominations
        </Link>
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
  const nomineeName =
    `${nominee?.first_name ?? ""} ${nominee?.last_name ?? ""}`.trim() ||
    "Unknown nominee";
  const isSelf = nomination.is_self_submission ?? !nominator;
  const submissionType = isSelf ? "Self submission" : "Nomination";
  const status = nomination.status;
  const allowed = actionsByStatus[status] ?? [];
  const supportingLinks = toUrlList(nomination.supporting_urls);
  const evidenceLinks = toUrlList(nomination.evidence_urls);
  const dialogCopy = pendingAction ? actionCopy[pendingAction] : null;

  return (
    <div className="flex flex-col gap-6 py-8">
      <Link
        href="/admin"
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to nominations
      </Link>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-text-main">
            Reviewing {nomineeName}
          </h1>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${nominationStatusStyles[status]}`}
          >
            {status}
          </span>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {allowed.includes("approve") && (
              <Button
                variant="default"
                icon={<Check size={16} />}
                text="Approve"
                disabled={actionLoading}
                onClick={() => setPendingAction("approve")}
                className="justify-center"
              />
            )}
            {allowed.includes("reject") && (
              <Button
                variant="ghost"
                icon={<X size={16} />}
                text="Reject"
                disabled={actionLoading}
                onClick={() => setPendingAction("reject")}
                className="text-danger hover:bg-danger/10"
              />
            )}
            {allowed.includes("suspend") && (
              <Button
                variant="ghost"
                icon={<Ban size={16} />}
                text="Suspend"
                disabled={actionLoading}
                onClick={() => setPendingAction("suspend")}
                className="text-warning hover:bg-warning/10"
              />
            )}
          </div>
          {actionError && <p className="text-sm text-danger">{actionError}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card title="Nominee Information">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                {getInitials(nomineeName)}
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
          {!isSelf && (
            <Card title="Nominator Details">
              <Field
                label="Submitted by"
                value={`${nominator?.first_name ?? ""} ${nominator?.last_name ?? ""}`.trim()}
              />
              <Field
                label="Relationship to nominee"
                value={nominator?.relationship_to_nominee || "Nominator"}
              />
              <Field label="Email address" value={nominator?.email} />
            </Card>
          )}

          <Card title="Status Overview">
            <Field
              label="Current status"
              value={status}
              className="capitalize"
            />
            <Field
              label="Submitted on"
              value={
                nomination.created_at ? formatDate(nomination.created_at) : "--"
              }
            />
            <Field
              label="Last updated"
              value={
                nomination.updated_at
                  ? formatDate(nomination.updated_at)
                  : nomination.created_at
                    ? formatDate(nomination.created_at)
                    : "--"
              }
            />
            <Field label="Submission type" value={submissionType} />
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={pendingAction !== null}
        setOpen={(open) => {
          if (!open) closeDialog();
        }}
        title={dialogCopy?.title ?? ""}
        description={dialogCopy?.description}
        confirmText={dialogCopy?.confirmText}
        loading={actionLoading}
        onConfirm={confirmAction}
      />
    </div>
  );
}