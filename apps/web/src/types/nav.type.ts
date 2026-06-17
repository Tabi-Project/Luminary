import { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface NavLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}
