import { menu } from "@/data/menu";
import { NavLinkProps } from "@/types/nav.type";
import { cn } from "@/utils/cn";
import { Button } from "@base-ui/react";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="w-full max-w-4xl mx-auto bg-background flex justify-between items-center p-4 ">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Luminary-logo"
          width={120}
          height={21}
        />
      </Link>
      <DesktopNav />
    </nav>
  );
};

export const DesktopNav = () => {
  return (
    <ul className="flex items-center gap-8">
      {menu.map((item) => (
        <li key={item.label}>
          <NavLink href={item.href}>{item.label}</NavLink>
        </li>
      ))}
      <Link
        href="/"
        className="bg-text-main text-bg-surface px-3 py-1.5 rounded-lg"
      >
        Nominate
      </Link>
    </ul>
  );
};

export const MobileNav = () => {
  return <></>;
};

const NavLink = ({ children, className, ...props }: NavLinkProps) => {
  return (
    <Link {...props} className={cn("nav-link", className)}>
      {children}
    </Link>
  );
};
