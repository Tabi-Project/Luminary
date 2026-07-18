import { NomineeProfile } from "@/types/profile.type";

export const PROFILE_ATTRIBUTES: {
  label: string;
  key: keyof Pick<NomineeProfile, "field" | "region" | "organization">;
}[] = [
  { label: "Field", key: "field" },
  { label: "Region", key: "region" },
  { label: "Organization", key: "organization" },
];
