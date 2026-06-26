import { NomineeProfile } from "@/types/profile.type";

export const MOCK_PROFILES: NomineeProfile[] = [
  {
    id: "1",
    firstname: "Amina",
    lastname: "Jameel",
    impact:
      "Rewriting maternal health protocols from a one-room clinic, significantly reducing preventable complications in her district. Her innovative approach has been adopted by neighboring regions.",
    field: "Medicine",
    region: "East Africa",
    organization: "Maternal Health Initiative",
    tags: ["Medicine", "East Africa"],
    profilePhoto: "https://i.pravatar.cc/200?u=amina",
    socialLinks: ["https://github.com/Blisyphus"],
    evidence: ["techforall.org", "linkedin.com/in/elena-r"],
  },
  {
    id: "2",
    firstname: "Elena",
    lastname: "Rodriguez",
    impact:
      "Bridging the digital divide by providing affordable internet and tech education to underserved communities. Her program has reached over 10,000 students in the last two years.",
    field: "Technology",
    region: "South America",
    organization: "TechForAll",
    tags: ["Technology", "South America"],
    profilePhoto: "https://i.pravatar.cc/200?u=amina",
    socialLinks: ["techforall.org", "linkedin.com/in/elena-r"],
    evidence: ["techforall.org", "linkedin.com/in/elena-r"],
  },
  {
    id: "3",
    firstname: "Sarah",
    lastname: "Chen",
    impact:
      "Developing sustainable waste management systems for urban environments. Her startup has successfully implemented composting programs in three major cities.",
    field: "Art & Culture",
    region: "Asia",
    organization: "GreenFuture",
    tags: ["Art & Culture", "Asia"],
    profilePhoto: "https://i.pravatar.cc/200?u=sarah",
    socialLinks: ["greenfuture.co"],
    evidence: ["techforall.org", "linkedin.com/in/elena-r"],
  },
];
