import type { ChangeEvent, ReactNode } from "react";
import FieldInputSingle from "./FieldInputSingle";
import FieldSelect from "./FieldSelect";
import FieldTextArea from "./FieldTextArea";
import FieldDate from "./FieldDate";
import { type FormProps, widthClass } from "../constants/formTypes";

function Form({
  fields,
  values,
  errors = {},
  onChange,
  onSubmit,
  submitLabel = "Send",
  className = "",
  submitClassName = "mt-2 w-full rounded-xl bg-gray-800 px-4 py-3 font-medium text-white transition hover:bg-gray-700",
  submitDisabled = false,
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

      <button type="submit" disabled={submitDisabled}  className={submitClassName}>
        {submitLabel}
      </button>
    </form>
  );
}

export default Form;
