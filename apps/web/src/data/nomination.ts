import { FIELDS_OF_WORK } from "@/data/constants/nomination";
import {
  FormStatus,
  NominationFormState,
  NominationTab,
} from "@/types/nomination.type";

export const INITIAL_STATE: NominationFormState = {
  nominator: { fullName: "", email: "", relationship: "" },
  nominee: { fullName: "", email: "", field: "", region: "", description: "" },
  supportingLinks: [""],
  evidenceLinks: [""],
  photo: null,
};

export const IDLE_STATUS: FormStatus = { type: "idle", message: "" };

export const FIELD_OPTIONS = FIELDS_OF_WORK.map((field) => ({
  label: field,
  value: field,
}));

export const TABS: { id: NominationTab; label: string }[] = [
  { id: "nomination", label: "Nomination" },
  { id: "self-submission", label: "Self Submission" },
];
