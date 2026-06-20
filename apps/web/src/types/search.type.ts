import { InputHTMLAttributes, ReactNode } from "react";

export interface SearchBarProps
  extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  inputClassName?: string;
}
