"use client";

import { Ban, Check, Eye, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/common/button";
import type { DataTableProps } from "@/types/table";

export function DataTable<TRow extends { id: string | number }>({
  columns,
  data,
  onView,
  onApprove,
  onReject,
  onSuspend,
  className,
  emptyMessage = "No records found.",
}: DataTableProps<TRow>) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-border bg-white",
        className,
      )}
    >
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

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      icon={<Eye size={15} />}
                      iconPosition="left"
                      text="View"
                      onClick={() => onView(row.id)}
                      className="text-primary hover:bg-primary/10 rounded-md px-3 py-1.5 text-xs"
                    />

                    {onApprove && (
                      <Button
                        variant="ghost"
                        icon={<Check size={15} />}
                        iconPosition="left"
                        text="Approve"
                        onClick={() => onApprove(row.id)}
                        className="text-success hover:bg-success/10 rounded-md px-3 py-1.5 text-xs"
                      />
                    )}

                    {onReject && (
                      <Button
                        variant="ghost"
                        icon={<X size={15} />}
                        iconPosition="left"
                        text="Reject"
                        onClick={() => onReject(row.id)}
                        className="text-danger hover:bg-danger/10 rounded-md px-3 py-1.5 text-xs"
                      />
                    )}

                    {onSuspend && (
                      <Button
                        variant="ghost"
                        icon={<Ban size={15} />}
                        iconPosition="left"
                        text="Suspend"
                        onClick={() => onSuspend(row.id)}
                        className="text-warning hover:bg-warning/10 rounded-md px-3 py-1.5 text-xs"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}