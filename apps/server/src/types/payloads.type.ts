import { Nominee } from "../db/schema.js";
import { NominationStatusValue } from "../lib/nominations.js";

export interface NominationPayload {
  is_self_submission?: boolean;
  nominee_first_name?: string;
  nominee_last_name?: string;
  nominee_email?: string;
  nominee_country?: string;
  nominee_field?: string;
  nominee_organization?: string;
  nominee_profile_image_url?: string;
  evidence_urls?: string[];
  supporting_urls?: string[];
  description?: string;
  nominator_first_name?: string;
  nominator_last_name?: string;
  nominator_email?: string;
  relationship_to_nominee?: string;
}

export interface UpdateNominationPayload {
  status?: NominationStatusValue;
  description?: string;
  evidence_urls?: string[];
  supporting_urls?: string[];
  is_self_submission?: boolean;
  nominee?: Partial<
    Pick<
      Nominee,
      | "first_name"
      | "last_name"
      | "email"
      | "country"
      | "field"
      | "organization"
      | "profile_image_url"
    >
  >;
}
