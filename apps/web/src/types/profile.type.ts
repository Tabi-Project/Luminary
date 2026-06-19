export interface NomineeProfile {
  id: string;
  name: string;
  field: string;
  region?: string;
  impact: string;
  tags: any;
  profilePhoto: string;
  socialLinks: string[]; // Links (Business website, projects, publications, social profiles)
  evidence: string[]; // Evidence section (Links to press coverage or documents)
}
