export interface NomineeProfile {
  id: string;
  firstname: string;
  lastname: string;
  field: string;
  region: string;
  impact: string;
  tags: string[];
  profilePhoto: string;
  socialLinks: string[];
  evidence: string[];
}

export interface ProfileCardProps {
  profile: NomineeProfile;
  className?: string;
}
