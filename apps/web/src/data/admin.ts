import { Star } from "lucide-react";

export const dashboardMenu = [
  {
    label: "Nomination",
    href: "/admin",
    icon: Star,
  },
];

export const nominationSortOptions = [
  { label: "Nominee name", value: "nominee_name" },
  { label: "Recently Added", value: "recently_added" },
  { label: "Oldest first", value: "nomination_date_asc" },
];

export const nominationDateRangeOptions = [
  { label: "All Time", value: "all_time" },
  { label: "Past 7 Days", value: "past_7_days" },
  { label: "Past 30 Days", value: "past_30_days" },
];
