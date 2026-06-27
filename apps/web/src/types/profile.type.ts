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

export interface ApiNominee {
  id: number;
  first_name: string;
  last_name: string;
  field: string;
  country: string;
  organization?: string;
  profile_image_url: string;
}

export interface ApiNomination {
  id: number;
  nominee_id: number;
  status: string;
  description: string;
  evidence_urls: string | string[];
  supporting_urls: string | string[];
  nominee: ApiNominee;
}
