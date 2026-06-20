import {
  FormFieldProps,
  FormLabelProps,
  SelectFieldProps,
  TextAreaFieldProps,
} from "@/types/form.type";
import { cn } from "@/utils/cn";

const fieldStyling =
  "w-full px-4 py-2 h-10 border border-border rounded-md bg-bg-surface";

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
  const inputStyling = cn(fieldStyling, inputClassName);

  const formFieldStyling = cn("flex flex-col gap-2", className);

  return (
    <div className={formFieldStyling}>
      <FormLabel label={label} htmlFor={htmlFor} required={required} />
      <input
        type={type}
        name={name}
        id={htmlFor}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={inputStyling}
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
  const selectStyling = cn(fieldStyling, selectClassName);

  const formFieldStyling = cn("flex flex-col gap-2", className);

  return (
    <div className={formFieldStyling}>
      <FormLabel label={label} htmlFor={htmlFor} required={required} />
      <select
        name={name}
        id={htmlFor}
        value={value}
        required={required}
        onChange={onChange}
        className={selectStyling}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
