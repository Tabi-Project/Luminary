"use client";

import { useState } from "react";
import { AdminService } from "@/services/admin.service";

export type NominationAction = "approve" | "reject" | "suspend";

const runners: Record<NominationAction, (id: string) => Promise<unknown>> = {
  approve: (id) => AdminService.ApproveNomination(id),
  reject: (id) => AdminService.RejectNomination(id),
  suspend: (id) => AdminService.SuspendNomination(id),
};

const meta: Record<
  NominationAction,
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

interface Options {
  onSuccess?: (action: NominationAction, id: string) => void | Promise<void>;
}

export function useNominationActions(options: Options = {}) {
  const [pending, setPending] = useState<{
    id: string;
    action: NominationAction;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trigger = (action: NominationAction, id: string) => {
    setError(null);
    setPending({ id, action });
  };

  const close = () => {
    setPending(null);
    setError(null);
  };

  const confirm = async () => {
    if (!pending) return;

    setLoading(true);
    setError(null);

    try {
      await runners[pending.action](pending.id);
      await options.onSuccess?.(pending.action, pending.id);
      setPending(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const active = pending ? meta[pending.action] : null;

  return {
    trigger,
    error,
    isPending: loading,
    dialog: {
      open: pending !== null,
      setOpen: (open: boolean) => {
        if (!open) close();
      },
      title: active?.title ?? "",
      description: active?.description,
      confirmText: active?.confirmText,
      loading,
      onConfirm: confirm,
    },
  };
}