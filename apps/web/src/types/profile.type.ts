export interface NomineeProfile {
  id: string;
  firstname: string;
  lastname: string;
  field: string;
  region: string;
  organization?: string;
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

export interface ProfileDetailProps {
  profile: NomineeProfile;
}

export interface ProfileLinksProps {
  title: string;
  links: string[];
}
