export const NOMINATION_STATUSES = [
  "pending",
  "approved",
  "rejected",
  "suspended",
  "consent_granted",
  "consent_rejected",
] as const;

export type NominationStatusValue = (typeof NOMINATION_STATUSES)[number];

export const NominationStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  SUSPENDED: "suspended",
  CONSENT_GRANTED: "consent_granted",
  CONSENT_REJECTED: "consent_rejected",
} as const satisfies Record<string, NominationStatusValue>;
