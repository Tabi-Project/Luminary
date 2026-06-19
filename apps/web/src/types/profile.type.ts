export interface EvidenceItem {
  title: string;
  subtitle: string;
}

export interface NomineeProfile {
  id: string;
  name: string;
  // email?: string;
  field: string;
  region?: string;
  // organization: string;
  impact: string;
  tags: any;
  profilePhoto: string;
  socialLinks: string[]; // Links (Business website, projects, publications, social profiles)
  evidence: EvidenceItem[]; // Evidence section (Links to press coverage or documents)
}
