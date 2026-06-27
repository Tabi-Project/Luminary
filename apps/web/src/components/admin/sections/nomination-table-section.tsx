"use client";
import { DataTableFilters } from "@/components/filters";
import { DataTable } from "@/components/table";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  nominationSortOptions,
  nominationSortOrderOptions,
} from "@/data/admin";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AdminService } from "@/services/admin.service";
import { LayoutList } from "lucide-react";
import {
  nominationColumns,
  type NominationRow,
} from "@/components/admin/columns/nomination-column";
import { DataTablePagination } from "@/components/pagination";

export function NominationTableSection() {
  const [filters, setFilters] = useState({
    search: "",
    sort_by: "created_at",
    sort_order: "desc",
  });
  const debouncedSearch = useDebounce(filters.search, 300);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 15;

  const {
    data: nominationsData,
    isLoading,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: [
      "nominations",
      debouncedSearch,
      filters.sort_by,
      filters.sort_order,
      page,
    ],
    placeholderData: keepPreviousData,
    queryFn: () =>
      AdminService.GetNominations(
        debouncedSearch,
        page,
        filters.sort_by,
        filters.sort_order,
      ),
  });

  const rows = (nominationsData?.data ?? []) as NominationRow[];

  const handleView = (id: NominationRow["id"]) => {
    console.log("View nomination:", id);
  };

  const updateFilter = (patch: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const isEmpty = !isLoading && !isFetching && !isError && rows.length === 0;
  const showTable = !isError && (isLoading || isFetching || rows.length > 0);

  return (
    <section className="w-full bg-white p-4 rounded-lg flex flex-col gap-4">
      <DataTableFilters
        sort={filters.sort_by}
        search={filters.search}
        sortOrder={filters.sort_order}
        sortOptions={nominationSortOptions}
        sortOrderOptions={nominationSortOrderOptions}
        searchPlaceholder="Search nominee name"
        setSort={(val) => updateFilter({ sort_by: val })}
        setSearch={(val) => updateFilter({ search: val })}
        setSortOrder={(val) => updateFilter({ sort_order: val })}
      />

      {isError && <p className="text-sm text-danger">Error: {error.message}</p>}

      {isEmpty && <EmptyTableState />}

      {showTable && (
        <DataTable<NominationRow>
          data={rows}
          onView={handleView}
          columns={nominationColumns}
          isLoading={isLoading || isFetching}
        />
      )}

      <DataTablePagination
        page={page}
        setPage={setPage}
        limit={PAGE_SIZE}
        recordName="nominations"
        totalCount={nominationsData?.meta?.total}
        totalPages={nominationsData?.meta?.total_pages}
      />
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
