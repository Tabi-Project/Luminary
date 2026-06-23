import {
  FormFieldProps,
  FormLabelProps,
  SelectFieldProps,
  TextAreaFieldProps,
  TextFieldProps,
} from "@/types/form.type";
import { cn } from "@/utils/cn";
import { Select } from "@base-ui/react";
import { Check, ChevronDown } from "lucide-react";

const fieldStyling =
  "w-full px-4 py-2 h-10 border border-border rounded-md bg-bg-surface";

export function TextField({ className, ...props }: TextFieldProps) {
  return <input className={cn(fieldStyling, className)} {...props} />;
}

export function FormField({
  label,
  htmlFor,
  required,
  type = "text",
  value,
  name,
  placeholder,
  onChange,
  inputClassName,
  className,
}: FormFieldProps) {
  const formFieldStyling = cn("flex flex-col gap-2", className);

  return (
    <div className={formFieldStyling}>
      <FormLabel label={label} htmlFor={htmlFor} required={required} />
      <TextField
        type={type}
        name={name}
        id={htmlFor}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
}

export function SelectField({
  label,
  htmlFor,
  required,
  name,
  value,
  placeholder = "Select an option",
  options,
  onChange,
  selectClassName,
  className,
}: SelectFieldProps) {
  const triggerStyling = cn(
    fieldStyling,
    "flex items-center justify-between gap-2 text-left outline-none focus-visible:border-primary",
    selectClassName,
  );

  const formFieldStyling = cn("flex flex-col gap-2", className);

  return (
    <div className={formFieldStyling}>
      <FormLabel label={label} htmlFor={htmlFor} required={required} />
      <Select.Root
        name={name}
        items={options}
        required={required}
        value={value ?? null}
        onValueChange={(selected) => onChange?.(selected ?? "")}
      >
        <Select.Trigger id={htmlFor} className={triggerStyling}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="text-muted">
            <ChevronDown className="size-4" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className="z-50" sideOffset={4}>
                            <Select.Popup className="select-popup min-w-[var(--anchor-width)] overflow-y-auto rounded-md border border-border bg-bg-surface py-1 shadow-md outline-none">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="flex cursor-pointer items-center justify-between gap-2 px-4 py-2 text-sm outline-none data-highlighted:bg-primary/10"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="text-primary">
                    <Check className="size-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export function TextAreaField({
  label,
  htmlFor,
  required,
  name,
  value,
  placeholder,
  rows = 5,
  onChange,
  textAreaClassName,
  className,
}: TextAreaFieldProps) {
  const textAreaStyling = cn(
    "w-full px-4 py-2 border border-border rounded-md bg-bg-surface resize-y",
    textAreaClassName,
  );

  const formFieldStyling = cn("flex flex-col gap-2", className);

  return (
    <div className={formFieldStyling}>
      <FormLabel label={label} htmlFor={htmlFor} required={required} />
      <textarea
        name={name}
        id={htmlFor}
        value={value}
        rows={rows}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={textAreaStyling}
      />
    </div>
  );
}

export function FormLabel({ label, htmlFor, required, className }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex text-muted items-start text-xs font-medium",
        className,
      )}
    >
      <span>{label}</span>
      {required && <span className="text-warning">*</span>}
    </label>
  );
}