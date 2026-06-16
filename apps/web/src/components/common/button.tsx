import { ButtonProps } from "@/types/button.type";
import { cn } from "@/utils/cn";
import { Button as BaseButton } from "@base-ui/react";

export function Button({
  text,
  icon,
  iconPosition,
  className,
  loading,
  ...props
}: ButtonProps) {
  const baseStyling =
    "w-fit flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary rounded-md shadow text-white";
  const styling = cn(baseStyling, className);

  return (
    <BaseButton className={styling} {...props}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {iconPosition === "left" && icon}
          {text}
          {iconPosition === "right" && icon}
        </>
      )}
    </BaseButton>
  );
}
