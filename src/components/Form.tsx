import type { ChangeEvent, FormEvent, ReactNode } from "react";
import FieldInputSingle from "./FieldInputSingle";
import FieldSelect, { type SelectOption } from "./FieldSelect";
import FieldTextArea from "./FieldTextArea";
import FieldDate from "./FieldDate";
import { type InputFieldType } from "../constants/fieldProps";

interface BaseFieldConfig {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  // "half" dùng khi cần 2 field nằm chung 1 dòng, ví dụ Start Date / End Date
  width?: "full" | "half";
}

interface TextFieldConfig extends BaseFieldConfig {
  type: InputFieldType;
  placeholder?: string;
  suffix?: string;
  maxLength?: number;
}

interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: SelectOption[];
  placeholder?: string;
  isClearable?: boolean;
}

interface TextAreaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  placeholder?: string;
  rows?: number;
}

interface DateFieldConfig extends BaseFieldConfig {
  type: "date";
}

// Muốn thêm field mới sau này thì thêm 1 interface tương tự và union vào đây
export type FieldConfig =
  | TextFieldConfig
  | SelectFieldConfig
  | TextAreaFieldConfig
  | DateFieldConfig;

export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string | undefined>;

interface FormProps {
  fields: FieldConfig[];
  values: FormValues;
  errors?: FormErrors;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  className?: string;
  submitClassName?: string;
}

const widthClass: Record<NonNullable<BaseFieldConfig["width"]>, string> = {
  full: "w-full",
  half: "w-[calc(50%-10px)]",
};

function Form({
  fields,
  values,
  errors = {},
  onChange,
  onSubmit,
  submitLabel = "Send",
  className = "",
  submitClassName = "mt-2 w-full rounded-xl bg-gray-800 px-4 py-3 font-medium text-white transition hover:bg-gray-700",
}: FormProps) {
  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-5 ${className}`}>
      {/* flex-wrap để 2 field "half" tự xếp cạnh nhau, field "full" tự xuống dòng riêng */}
      <div className="flex flex-wrap gap-5">
        {fields.map((field) => {
          const commonProps = {
            label: field.label,
            required: field.required,
            disabled: field.disabled,
            className: field.className,
            error: errors[field.name],
          };

          let fieldElement: ReactNode;

          if (field.type === "select") {
            fieldElement = (
              <FieldSelect
                {...commonProps}
                name={field.name}
                options={field.options}
                placeholder={field.placeholder}
                isClearable={field.isClearable}
                value={values[field.name] ?? ""}
                onChange={(value) => onChange(field.name, value)}
              />
            );
          } else if (field.type === "textarea") {
            fieldElement = (
              <FieldTextArea
                {...commonProps}
                placeholder={field.placeholder}
                rows={field.rows}
                value={values[field.name] ?? ""}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  onChange(field.name, e.target.value)
                }
              />
            );
          } else if (field.type === "date") {
            fieldElement = (
              <FieldDate
                {...commonProps}
                value={values[field.name] ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange(field.name, e.target.value)
                }
              />
            );
          } else {
            fieldElement = (
              <FieldInputSingle
                {...commonProps}
                type={field.type}
                placeholder={field.placeholder}
                suffix={field.suffix}
                maxLength={field.maxLength}
                value={values[field.name] ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange(field.name, e.target.value)
                }
              />
            );
          }

          return (
            <div key={field.name} className={widthClass[field.width ?? "full"]}>
              {fieldElement}
            </div>
          );
        })}
      </div>

      <button type="submit" className={submitClassName}>
        {submitLabel}
      </button>
    </form>
  );
}

export default Form;