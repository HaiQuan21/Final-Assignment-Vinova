import { type InputFieldType, type SelectOption } from "./fieldProps";
import { type FormEvent } from "react";
import { type FormType } from "./navigation";

export interface BaseFieldConfig {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  // "half" dùng khi cần 2 field nằm chung 1 dòng, ví dụ Start Date / End Date
  width?: "full" | "half";
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: InputFieldType;
  placeholder?: string;
  suffix?: string;
  maxLength?: number;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: SelectOption[];
  placeholder?: string;
  isClearable?: boolean;
}

export interface TextAreaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  placeholder?: string;
  rows?: number;
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date";
}

// Muốn thêm field mới sau này thì thêm 1 interface tương tự
export type FieldConfig =
  | TextFieldConfig
  | SelectFieldConfig
  | TextAreaFieldConfig
  | DateFieldConfig;

export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string | undefined>;

export interface FormProps {
  fields: FieldConfig[];
  values: FormValues;
  errors?: FormErrors;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  className?: string;
  submitClassName?: string;
}

export const widthClass: Record<
  NonNullable<BaseFieldConfig["width"]>,
  string
> = {
  full: "w-full",
  half: "w-[calc(50%-10px)]",
};

export interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ToolbarProps {
  title: string;
  formType?: FormType;
}
