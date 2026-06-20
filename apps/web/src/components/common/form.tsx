import { FormLabelProps } from "@/types/form.type";
import { cn } from "@/utils/cn";
import { Select } from "@base-ui/react";
import { ChevronDown, Check } from "lucide-react";

interface FormFieldProps extends FormLabelProps {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  inputClassName?: string;
  className?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectFieldProps extends FormLabelProps {
  name?: string;
  value?: string;
  placeholder?: string;
  inputClassName?: string;
  className?: string;
  labelClassName?: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
}

const cls = {
  popup:
    "select-popup rounded-md border w-[100%] border-slate-200 bg-white shadow-md py-1 text-sm z-50",
  item: "flex items-center justify-between px-3 py-2 cursor-pointer outline-none data-[highlighted]:bg-gray-50 data-[selected]:text-primary",
};

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
  labelClassName,
}: FormFieldProps) {
  const inputStyling = cn(
    "w-full px-4 py-2 h-10 border border-border",
    inputClassName,
  );

  const formFieldStyling = cn("flex flex-col gap-2", className);

  return (
    <div className={formFieldStyling}>
      <FormLabel
        label={label}
        htmlFor={htmlFor}
        required={required}
        className={labelClassName}
      />
      <input
        type={type}
        name={name}
        id={htmlFor}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputStyling}
        required={required}
      />
    </div>
  );
}

function FormLabel({ label, htmlFor, required }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex text-muted items-start text-xs font-medium"
    >
      <span>{label}</span>
      {required && <span className="text-warning">*</span>}
    </label>
  );
}


export function SelectField({
  label,
  htmlFor,
  required,
  options,
  value,
  name,
  placeholder,
  onChange,
  inputClassName,
  className,
  labelClassName,
}: SelectFieldProps) {
  const inputStyling = cn(
    "w-full flex items-center justify-between px-3 h-10 border border-slate-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
    inputClassName,
  );

  const formFieldStyling = cn("flex flex-col gap-2", className);

  return (
    <div className={formFieldStyling}>
      <FormLabel
        label={label}
        htmlFor={htmlFor}
        required={required}
        className={labelClassName}
      />
      <Select.Root value={value} onValueChange={(val) => onChange?.(val ?? "")} name={name}>
        <Select.Trigger className={inputStyling}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon><ChevronDown size={14} /></Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={4}>
            <Select.Popup className={cls.popup}>
              <Select.List>
                {options.map((s) => (
                  <Select.Item key={s.value} value={s.value} className={cls.item}>
                    <Select.ItemText>{s.label}</Select.ItemText>
                    <Select.ItemIndicator><Check size={12} /></Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}