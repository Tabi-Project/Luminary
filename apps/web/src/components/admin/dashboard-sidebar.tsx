"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../common/button";
import { dashboardMenu } from "@/data/admin";
import { AuthService } from "@/services/auth.service";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-70 bg-white border-r border-border shadow flex flex-col h-dvh p-4 py-8 items-center justify-between">
      <div className="flex flex-col items-center gap-8 w-full">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={200}
            height={80}
            alt="Luminary logo"
          />
        </Link>

        <nav className="flex flex-col gap-1 w-full">
          {dashboardMenu.map(({ label, href, icon: Icon }) => {
            const isActive =
              href === "/admin" ? pathname === href : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon fill={isActive ? "#0ea5a4" : ""} className="shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <Button
        text="Logout"
        variant="ghost"
        icon={<LogOut size={20} />}
        onClick={() => AuthService.logout()}
        className="w-full justify-center text-danger border-danger hover:bg-danger/10"
      />
    </aside>
  );
}
