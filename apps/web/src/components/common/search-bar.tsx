import { SearchBarProps } from "@/types/search.type";
import { cn } from "@/utils/cn";
import { Search } from "lucide-react";

export function SearchBar({
  icon,
  type = "search",
  placeholder = "Search...",
  className,
  inputClassName,
  ...props
}: SearchBarProps) {
  const containerStyling = cn(
    "flex w-full items-center gap-2 h-10 px-4 border border-border rounded-md bg-bg-surface focus-within:border-primary",
    className,
  );

  const inputStyling = cn(
    "w-full bg-transparent text-sm text-text-main placeholder:text-muted outline-none",
    inputClassName,
  );

  return (
    <label className={containerStyling}>
      <span className="flex shrink-0 text-muted" aria-hidden="true">
        {icon ?? <Search className="size-4" />}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className={inputStyling}
        {...props}
      />
    </label>
  );
}
