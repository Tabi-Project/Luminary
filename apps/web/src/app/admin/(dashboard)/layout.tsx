import { DashboardSidebar } from "@/components/admin/dashboard-sidebar";
import { ReactNode } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full flex h-dvh">
      <DashboardSidebar />
      <div className="w-full h-dvh lg:px-10 px-5 overflow-y-scroll noscroll">
        {children}
      </div>
    </div>
  );
}
