import { Star } from "lucide-react";

export const dashboardMenu = [
  {
    label: "Nomination",
    href: "/admin",
    icon: Star,
  },
];

export const nominationSortOptions = [
  { label: "Nominee Name", value: "nominee_name" },
  { label: "Date Added", value: "created_at" },
];

export const nominationSortOrderOptions = [
  { label: "Newest First", value: "desc" },
  { label: "Oldest First", value: "asc" },
];
