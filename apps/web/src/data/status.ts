import type { NominationStatus } from "@/types/nomination.type";

export const nominationStatusStyles: Record<NominationStatus, string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-danger/10 text-danger",
  suspended: "bg-muted/10 text-muted",
};

export const actionsByStatus: Record<
  NominationStatus,
  Array<"approve" | "reject" | "suspend">
> = {
  pending: ["approve", "reject"],
  approved: ["suspend"],
  rejected: ["approve"],
  suspended: ["approve"],
};