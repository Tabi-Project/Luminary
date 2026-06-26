"use client";
import { DataTableFilters } from "@/components/filters";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  nominationDateRangeOptions,
  nominationSortOptions,
} from "@/data/admin";
import { useQuery } from "@tanstack/react-query";
import { AdminService } from "@/services/admin.service";
import { LayoutList } from "lucide-react";

export function NominationTableSection() {
  const [filters, setFilters] = useState({
    search: "",
    sort: "nominee_name",
    dateRange: "all_time",
  });
  const debouncedSearch = useDebounce(filters.search, 300);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });

  const {
    data: nominationsData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["nominations", filters.dateRange, debouncedSearch, filters.sort],
    queryFn: () => AdminService.GetNominations(),
  });

  return (
    <section className="w-full bg-white p-4 rounded-lg flex flex-col gap-4">
      <DataTableFilters
        sort={filters.sort}
        search={filters.search}
        dateRange={filters.dateRange}
        sortOptions={nominationSortOptions}
        searchPlaceholder="Search nominee name"
        dateRangeOptions={nominationDateRangeOptions}
        setSort={(val) => setFilters({ ...filters, sort: val })}
        setSearch={(val) => setFilters({ ...filters, search: val })}
        setDateRange={(val) => setFilters({ ...filters, dateRange: val })}
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {nominationsData?.data &&
        (nominationsData.data.length === 0 ? (
          <EmptyTableState />
        ) : (
          <div>{/* your table */}</div>
        ))}
    </section>
  );
}

const EmptyTableState = () => {
  return (
    <div className="w-full min-h-50 lg:min-h-100 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-center bg-primary/5 p-4 gap-2">
      <div className="bg-light-gray/50 p-3 rounded-lg">
        <LayoutList />
      </div>
      <span className="text-text-main font-bold">No nominations found.</span>
      <p className="text-sm text-muted">
        Try searching for a different nominee, date range, changing the status,
        or clearing the filters.
      </p>
    </div>
  );
};
