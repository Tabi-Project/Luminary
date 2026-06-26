import { DashboardHeader } from "@/components/admin/dashboard-header";
import { NominationTableSection } from "@/components/admin/sections/nomination-table-section";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8 py-10">
      <DashboardHeader
        header="Nominations Management"
        subHeader="Review, track, and manage incoming nominations and self-submissions with a clean workflow built for fast decisions. "
      />
      <NominationTableSection />
    </div>
  );
}
