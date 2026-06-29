import type { SelectOption } from "@/types/form.type";

export const MAX_GRID_ITEMS = 4;

export const regionFilterOptions: SelectOption[] = [
  { value: "all", label: "All Regions" },
  { value: "Global", label: "Global" },
  { value: "Africa", label: "Africa" },
  { value: "North America", label: "North America" },
  { value: "Europe", label: "Europe" },
  { value: "Asia", label: "Asia" },
  { value: "Latin America", label: "Latin America" },
  { value: "Middle East", label: "Middle East" },
];

export const timeFilterOptions: SelectOption[] = [
  { value: "all", label: "Any Time" },
  { value: "last-7", label: "Last 7 days" },
  { value: "last-30", label: "Last 30 days" },
  { value: "last-90", label: "Last 90 days" },
  { value: "this-year", label: "This year" },
];

export const categoryFilterOptions = (
  categories: SelectOption[],
): SelectOption[] => {
  return [{ value: "all", label: "All Fields" }, ...categories];
};
