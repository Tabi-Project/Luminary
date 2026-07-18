import { ApiNomination } from "@/types/nomination.type";
import { NomineeProfile } from "@/types/profile.type";

// URLs are stored inconsistently (a JSON-encoded string for evidence, a real
// array for supporting links), so normalize both into a string[] safely.
export const toUrlArray = (
  value: string | string[] | null | undefined,
): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || value.trim() === "") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [value];
  } catch {
    return [value];
  }
};

export const toNomineeProfile = (item: ApiNomination): NomineeProfile => ({
  id: item.id.toString(),
  firstname: item.nominee.first_name,
  lastname: item.nominee.last_name,
  field: item.nominee.field,
  region: item.nominee.country,
  organization: item.nominee.organization,
  impact: item.description,
  tags: [item.nominee.field, item.nominee.country],
  profilePhoto: item.nominee.profile_image_url,
  socialLinks: toUrlArray(item.supporting_urls),
  evidence: toUrlArray(item.evidence_urls),
});
