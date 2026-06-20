import { VerificationStep } from "@/types/nomination.type";

export const FIELDS_OF_WORK = [
  "Business & Entrepreneurship",
  "Science & Research",
  "Technology & Engineering",
  "Arts & Culture",
  "Activism & Advocacy",
  "Education & Academia",
  "Health & Medicine",
  "Agriculture & Food",
  "Politics & Governance",
  "Sports & Fitness",
  "Media & Journalism",
  "Finance & Economics",
];

export const ACCEPTED_IMAGE_TYPES = ".jpg,.jpeg,.png,.webp";

export const MAX_IMAGE_SIZE_MB = 5;

export const VERIFICATION_STEPS: VerificationStep[] = [
  {
    title: "Submission",
    description:
      "Provide detailed information and evidence about the nominee's impact and achievements.",
  },
  {
    title: "Outreach & Consent",
    description:
      "We send an automated email to the nominee informing them of the nomination and requesting their consent.",
  },
  {
    title: "Verification",
    description:
      "Our team reviews the provided evidence, publications, and links to verify the profile.",
  },
  {
    title: "Publication",
    description:
      "Once consent is given and verification is complete, the profile goes live in the directory.",
  },
];
