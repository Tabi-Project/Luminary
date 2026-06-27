import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./common/button";

export function DataTablePagination({
  page,
  limit = 15,
  setPage,
  totalCount = 0,
  totalPages,
  recordName = "records",
}: {
  page: number;
  limit?: number;
  totalCount: number | undefined;
  totalPages?: number;
  setPage: (page: number) => void;
  recordName: string;
}) {
  const computedTotalPages =
    totalPages ?? (totalCount > 0 ? Math.ceil(totalCount / limit) : 1);

  const start = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalCount ?? 0);

  return (
    <div className="w-full flex items-center justify-between">
      <div>
        <span className="text-sm text-muted font-semibold">
          {totalCount === 0
            ? `0 ${recordName}`
            : `Showing ${start}–${end} of ${totalCount} ${recordName}`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          disabled={page <= 1}
          className="px-2 py-1.5"
          icon={<ArrowLeft size={20} />}
          onClick={() => setPage(page - 1)}
        />
        <Button
          className="px-2 py-1.5"
          icon={<ArrowRight size={20} />}
          disabled={page >= computedTotalPages}
          onClick={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
