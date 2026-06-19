import { NomineeProfile } from "@/types/profile.type";

export const MOCK_PROFILES: NomineeProfile[] = [
  {
    id: "1",
    name: "Amina J.",
    organization: "Rural Health Initiative",
    impact:
      "Rewriting maternal health protocols from a one-room clinic, significantly reducing preventable complications in her district. Her innovative approach has been adopted by neighboring regions.",
    field: "Medicine",
    region: "East Africa",
    get tags() {
      return [this.field, this.region];
    },
    profilePhoto: "https://i.pravatar.cc/200?u=amina",
    socialLinks: ["ruralhealthinit.org"],
    evidence: [
      {
        title: "WHO Regional Health Award",
        subtitle: "Award Record · 2023",
      },
    ],
  },
  {
    id: "2",
    name: "Elena Rodriguez",
    organization: "Tech for All",
    impact:
      "Bridging the digital divide by providing affordable internet and tech education to underserved communities. Her program has reached over 10,000 students in the last two years.",
    field: "Medicine",
    region: "East Africa",
    get tags() {
      return [this.field, this.region];
    },
    profilePhoto: "https://i.pravatar.cc/200?u=elena",
    socialLinks: ["techforall.org", "linkedin.com/in/elena-r"],
    evidence: [
      {
        title: "Forbes 30 Under 30",
        subtitle: "Social Impact · 2024",
      },
      {
        title: "Digital Inclusion Grant",
        subtitle: "Foundation Grant · 2023",
      },
    ],
  },
  {
    id: "3",
    name: "Sarah Chen",
    organization: "Green Future",
    impact:
      "Developing sustainable waste management systems for urban environments. Her startup has successfully implemented composting programs in three major cities.",
    field: "Medicine",
    region: "East Africa",
    get tags() {
      return [this.field, this.region];
    },
    profilePhoto: "https://i.pravatar.cc/200?u=sarah",
    socialLinks: ["greenfuture.co"],
    evidence: [
      {
        title: "Eco-Innovation Prize",
        subtitle: "Environmental Award · 2022",
      },
    ],
  },
];
