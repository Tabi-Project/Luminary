"use client";
import { Search } from "lucide-react";
import { SelectField, TextField } from "./common/form";
import { SelectOption } from "@/types/form.type";

interface DataTableFiltersProps {
  sort: string;
  search: string;
  dateRange: string;
  searchPlaceholder: string;
  sortOptions: SelectOption[];
  setSort: (val: string) => void;
  dateRangeOptions: SelectOption[];
  setSearch: (val: string) => void;
  setDateRange: (val: string) => void;
}

export function DataTableFilters({
  sort,
  dateRange,
  search,
  searchPlaceholder,
  dateRangeOptions,
  sortOptions,
  setDateRange,
  setSort,
  setSearch,
}: DataTableFiltersProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="w-full lg:min-w-[300px] lg:max-w-1/3 items-center flex bg-primary/5 pl-3 gap-3 rounded-lg border border-border shrink-0">
        <Search size={20} color="#0ea5a4" />
        <TextField
          className="border-none outline-none bg-transparent px-0"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full flex gap-2">
        <SelectField
          label=""
          className="w-full"
          value={dateRange}
          options={dateRangeOptions}
          onChange={(val) => setDateRange(val)}
          selectClassName="bg-primary/5 h-full"
        />
        <SelectField
          label=""
          className="w-full"
          value={sort}
          options={sortOptions}
          onChange={(val) => setSort(val)}
          selectClassName="bg-primary/5 h-full"
        />
      </div>
    </div>
  );
}
