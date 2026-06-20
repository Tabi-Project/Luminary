"use client";

import { FormLabelProps } from "@/types/form.type";
import { Plus, X } from "lucide-react";

interface LinkFieldsProps extends FormLabelProps {
  name: string;
  values: string[];
  placeholder?: string;
  onChange: (values: string[]) => void;
}

export function LinkFields({
  label,
  htmlFor,
  name,
  values,
  required,
  placeholder = "https://",
  onChange,
}: LinkFieldsProps) {
  const updateLink = (index: number, value: string) => {
    onChange(values.map((link, i) => (i === index ? value : link)));
  };

  const addLink = () => onChange([...values, ""]);

  const removeLink = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="flex items-start text-xs font-medium text-muted"
      >
        <span>{label}</span>
        {required && <span className="text-warning">*</span>}
      </label>

      <div className="flex flex-col gap-3">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="url"
              name={`${name}${index + 1}`}
              id={index === 0 ? htmlFor : undefined}
              value={value}
              required={required && index === 0}
              placeholder={placeholder}
              aria-label={`${label} ${index + 1}`}
              onChange={(event) => updateLink(index, event.target.value)}
              className="h-10 w-full rounded-md border border-border bg-bg-surface px-4 py-2"
            />
            {values.length > 1 && (
              <button
                type="button"
                aria-label="Remove link"
                onClick={() => removeLink(index)}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted hover:border-danger hover:text-danger"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addLink}
        className="flex w-fit items-center gap-1 text-sm font-medium text-muted hover:text-text-main"
      >
        <Plus className="size-4" /> Add another link
      </button>
    </div>
  );
}
