export type NominationTab = "nomination" | "self-submission";

export type FormStatusType = "idle" | "success" | "error";

export interface FormStatus {
  type: FormStatusType;
  message: string;
}

export interface NominatorDetails {
  fullName: string;
  email: string;
  relationship: string;
}

export interface NomineeDetails {
  fullName: string;
  email: string;
  field: string;
  region: string;
  description: string;
}

export interface NominationFormState {
  nominator: NominatorDetails;
  nominee: NomineeDetails;
  supportingLinks: string[];
  evidenceLinks: string[];
  photo: File | null;
}

/**
 * Payload shape expected by the backend `POST /nomination` endpoint.
 * Nominator fields are only present for nominations (not self-submissions).
 */
export interface NominationPayload {
  is_self_submission: boolean;
  nominee_first_name: string;
  nominee_last_name: string;
  nominee_email: string;
  nominee_country: string;
  nominee_field: string;
  nominee_organization: string;
  nominee_profile_image_url: string;
  evidence_urls: string[];
  supporting_urls: string[];
  description: string;
  nominator_first_name?: string;
  nominator_last_name?: string;
  nominator_email?: string;
  relationship_to_nominee?: string;
}

export interface UploadedFile {
  url: string;
}

export interface VerificationStep {
  title: string;
  description: string;
}
