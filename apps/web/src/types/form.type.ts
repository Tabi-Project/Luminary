import type { ChangeEvent } from "react";

export interface FormLabelProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormFieldProps extends FormLabelProps {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  inputClassName?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectFieldProps extends FormLabelProps {
  name?: string;
  value?: string;
  placeholder?: string;
  options: SelectOption[];
  selectClassName?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export interface TextAreaFieldProps extends FormLabelProps {
  name?: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  textAreaClassName?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
