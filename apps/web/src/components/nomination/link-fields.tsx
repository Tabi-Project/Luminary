"use client";

import { Button } from "@/components/common/button";
import { FormLabel, TextField } from "@/components/common/form";
import { LinkFieldsProps } from "@/types/nomination.type";
import { Plus, X } from "lucide-react";

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
      <FormLabel label={label} htmlFor={htmlFor} required={required} />

      <div className="flex flex-col gap-3">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <TextField
              type="url"
              name={`${name}${index + 1}`}
              id={index === 0 ? htmlFor : undefined}
              value={value}
              required={required && index === 0}
              placeholder={placeholder}
              aria-label={`${label} ${index + 1}`}
              onChange={(event) => updateLink(index, event.target.value)}
            />
            {values.length > 1 && (
              <Button
                type="button"
                text=""
                aria-label="Remove link"
                onClick={() => removeLink(index)}
                icon={<X className="size-4" />}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-transparent p-0 text-muted shadow-none hover:border-danger hover:text-danger"
              />
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        text="Add another link"
        onClick={addLink}
        icon={<Plus className="size-4" />}
        className="w-fit gap-1 bg-transparent p-0 text-sm font-medium text-muted shadow-none hover:text-text-main"
      />
    </div>
  );
}
