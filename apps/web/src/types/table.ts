import type { ReactNode } from "react";

/**
 * A single column definition.
 *
 * @template TRow - The shape of a data row. Must include at least an `id` field.
 *
 * @property id         - Unique column identifier. Used as the React key, so it must
 *                        be unique across columns even when several render from the
 *                        same `key` (e.g. multiple fields off a nested object).
 * @property key        - Optional key of TRow whose value this column renders by
 *                        default. Omit when `render` derives the cell itself.
 * @property header     - The column header label.
 * @property className  - Optional extra class applied to every `<td>` in this column.
 * @property render     - Optional custom cell renderer. When provided, overrides the
 *                        default value lookup via `key`.
 */
export interface TableColumn<TRow extends { id: string | number }> {
  id: string;
  key?: keyof TRow;
  header: string;
  className?: string;
  render?: (value: TRow[keyof TRow] | undefined, row: TRow) => ReactNode;
}

/**
 * Props for the DataTable component.
 *
 * @template TRow - The shape of a data row. Must include at least an `id` field.
 *
 * @property columns      - Column definitions.
 * @property data         - Array of row objects to render.
 * @property onView       - Called with the row's `id` when the View button is clicked.
 * @property className    - Optional extra class applied to the outermost wrapper.
 * @property emptyMessage - Optional message shown when `data` is empty.
 *                          Defaults to "No records found."
 */
export interface DataTableProps<TRow extends { id: string | number }> {
  columns: TableColumn<TRow>[];
  data: TRow[];
  onView: (id: TRow["id"]) => void;
  className?: string;
  emptyMessage?: string;
}
