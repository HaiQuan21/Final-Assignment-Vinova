import type { Control } from "react-hook-form";

export type InputFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel";

  // ── Base props chung cho tất cả field ────────────────────────────────────────
interface BaseFieldProps {
  name: string;         
  control: Control<any>;
  label: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export interface FieldInputSingleProps extends BaseFieldProps {
  type?: InputFieldType;
  placeholder?: string;
  suffix?: string;
  maxLength?: number;
}

export interface FieldTextAreaProps extends BaseFieldProps {
  placeholder?: string;
  rows?: number;

}

export interface FieldDateProps extends BaseFieldProps {

}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldSelectProps extends BaseFieldProps{
  options: SelectOption[];
  placeholder?: string;
  isClearable?: boolean;
}

export interface FieldToggleProps extends BaseFieldProps {
  options: { value: string; label: string }[];
}