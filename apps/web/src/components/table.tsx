"use client";

import { Eye, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/common/button";
import type { DataTableProps } from "@/types/table";

export function DataTable<TRow extends { id: string | number }>({
  columns,
  data,
  onView,
  className,
  emptyMessage = "No records found.",
  isLoading = false,
}: DataTableProps<TRow>) {
  return (
    <div
      className={cn(
        "relative w-full overflow-x-auto rounded-lg border border-border bg-white",
        className,
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/70">
          <Loader2 size={24} className="animate-spin text-primary" />
        </div>
      )}
      <table className="w-full min-w-max border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-surface text-left">
            {columns.map((col) => (
              <th
                key={col.id}
                className="px-4 py-3 font-semibold text-muted tracking-wide whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}

            <th className="px-4 py-3 font-semibold text-muted tracking-wide text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-10 text-center text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-border transition-colors duration-150 hover:bg-primary/5",
                  rowIndex % 2 === 0 ? "bg-white" : "bg-bg-surface/50",
                )}
              >
                {columns.map((col) => {
                  const value = col.key ? row[col.key] : undefined;
                  return (
                    <td
                      key={col.id}
                      className={cn(
                        "px-4 py-3 text-text-main whitespace-nowrap",
                        col.className,
                      )}
                    >
                      {col.render
                        ? col.render(value, row)
                        : String(value ?? "")}
                    </td>
                  );
                })}

                <td className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    icon={<Eye size={15} />}
                    iconPosition="left"
                    text="View"
                    onClick={() => onView(row.id)}
                    className="ml-auto text-primary hover:bg-primary/10 rounded-md px-3 py-1.5 text-xs"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
