import { Nominee } from "@/types/nomination.type";
import type { TableColumn } from "@/types/table";

export interface NominationRow {
  id: string;
  nominee: Nominee;
  is_self_submission: boolean;
  created_at: string;
  status: "pending" | "approved" | "rejected" | "suspended";
}

const fullName = (row: NominationRow) =>
  `${row.nominee.first_name} ${row.nominee.last_name}`;

const statusStyles: Record<NominationRow["status"], string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-danger/10 text-danger",
  suspended: "bg-muted/10 text-muted",
};

export const nominationColumns: TableColumn<NominationRow>[] = [
  {
    id: "nominee.name",
    header: "Nominee",
    render: (_, row) => (
      <span className="font-medium text-text-main">{fullName(row)}</span>
    ),
  },
  {
    id: "nominee.email",
    header: "Email",
    render: (_, row) => <span className="text-muted">{row.nominee.email}</span>,
  },
  {
    id: "nominee.field",
    header: "Field",
    render: (_, row) => <span>{row.nominee.field}</span>,
  },
  {
    id: "nominee.country",
    header: "Region",
    render: (_, row) => <span>{row.nominee.country}</span>,
  },
  {
    id: "is_self_submission",
    key: "is_self_submission",
    header: "Type",
    render: (val) => (
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          val ? "bg-primary/10 text-primary" : "bg-muted-blue text-tertiary"
        }`}
      >
        {val ? "Self" : "Nominated"}
      </span>
    ),
  },
  {
    id: "created_at",
    key: "created_at",
    header: "Date",
    render: (val) => (
      <span className="text-muted text-xs">
        {new Date(String(val)).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    id: "status",
    key: "status",
    header: "Status",
    render: (val) => {
      const status = val as NominationRow["status"];
      return (
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
];
