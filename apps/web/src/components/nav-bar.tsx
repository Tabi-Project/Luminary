import { menu } from "@/data/menu";
import { NavLinkProps } from "@/types/nav.type";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

export const NavBar = () => {
  return (
    <nav className="w-full max-w-screen sticky top-0 z-2 sm:max-w-6xl mx-auto bg-background flex justify-between items-center p-4 py-5 lg:px-2 ">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Luminary-logo"
          width={130}
          height={24}
        />
      </Link>
      <DesktopNav />
      <MobileNav />
    </nav>
  );
};

export const DesktopNav = () => {
  return (
    <ul className="lg:flex items-center gap-8 font-light hidden">
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

const NavLink = ({ children, className, ...props }: NavLinkProps) => {
  return (
    <Link {...props} className={cn("nav-link", className)}>
      {children}
    </Link>
  );
};
