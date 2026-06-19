import { FormLabelProps } from "@/types/form.type";
import { cn } from "@/utils/cn";

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
