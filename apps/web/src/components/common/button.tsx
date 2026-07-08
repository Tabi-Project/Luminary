import { ButtonProps } from "@/types/button.type";
import { cn } from "@/utils/cn";
import { Button as BaseButton } from "@base-ui/react";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-primary text-white shadow hover:bg-primary/90",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
};

export function Button({
  text,
  icon,
  iconPosition = "left",
  className,
  loading,
  variant = "default",
  ...props
}: ButtonProps) {
  const baseStyling =
    "w-fit flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
  const styling = cn(baseStyling, variantStyles[variant], className);

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
