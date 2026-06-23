import type { ReactNode } from "react";
import { FormLabelProps } from "@/types/form.type";

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

export interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export interface LinkFieldsProps extends FormLabelProps {
  name: string;
  values: string[];
  placeholder?: string;
  onChange: (values: string[]) => void;
}

export interface PhotoUploadProps {
  id: string;
  label: string;
  required?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
}
