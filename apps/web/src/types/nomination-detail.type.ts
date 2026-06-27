import type { Nominee } from "@/types/nomination.type";

export type NominationStatus = "pending" | "approved" | "rejected" | "suspended";

export interface Nominator {
  first_name: string;
  last_name: string;
  email: string;
  relationship_to_nominee?: string;
}

export interface NominationDetail {
  id: string;
  status: NominationStatus;
  description?: string;
  evidence_urls?: string[] | string | null;
  supporting_urls?: string[] | string | null;
  created_at: string;
  updated_at?: string;
  is_self_submission?: boolean;
  nominee: Nominee;
  nominator?: Nominator | null;
}