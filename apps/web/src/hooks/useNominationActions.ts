"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  onSuccess?: (action: NominationAction, id: string) => void;
}

/**
 * Shared approve / reject / suspend logic for nominations.
 * Owns the confirmation-dialog state and the mutation, so the table
 * and the detail page drive the same flow. Invalidates both the list
 * (`nominations`) and the single-item (`nomination`) queries on success.
 */
export function useNominationActions(options: Options = {}) {
  const queryClient = useQueryClient();
  const [pending, setPending] = useState<{
    id: string;
    action: NominationAction;
  } | null>(null);

  const mutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: NominationAction }) =>
      runners[action](id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["nominations"] });
      queryClient.invalidateQueries({ queryKey: ["nomination", variables.id] });
      setPending(null);
      options.onSuccess?.(variables.action, variables.id);
    },
  });

  const trigger = (action: NominationAction, id: string) =>
    setPending({ id, action });

  const active = pending ? meta[pending.action] : null;

  return {
    trigger,
    pending,
    isPending: mutation.isPending,
    dialog: {
      open: pending !== null,
      setOpen: (open: boolean) => {
        if (!open) setPending(null);
      },
      title: active?.title ?? "",
      description: active?.description,
      confirmText: active?.confirmText,
      loading: mutation.isPending,
      onConfirm: () => {
        if (pending) mutation.mutate(pending);
      },
    },
  };
}