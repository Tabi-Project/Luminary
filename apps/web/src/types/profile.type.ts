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

export interface ApiNominee {
  id: number;
  first_name: string;
  last_name: string;
  field: string;
  country: string;
  profile_image_url: string;
}

export interface ApiNomination {
  nominee_id: number;
  status: string;
  description: string;
  evidence_urls: string;
  supporting_urls: string[];
  nominee: ApiNominee;
}
