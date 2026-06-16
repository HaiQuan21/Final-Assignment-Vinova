import FieldInputSingle, { type InputFieldType } from "./FieldInputSingle";
import FieldSelect, { type SelectOption } from "./FieldSelect";

interface BaseFieldConfig {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

interface TextFieldConfig extends BaseFieldConfig {
  type: InputFieldType;
}

interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: SelectOption[];
  placeholder?: string;
  isClearable?: boolean;
}

// Muốn thêm field mới sau này thì thêm 1 interface tương tự và union vào đây
export type FieldConfig = TextFieldConfig | SelectFieldConfig;

export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string | undefined>;

interface FormProps {
  fields: FieldConfig[];
  values: FormValues;
  errors?: FormErrors;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  className?: string;
  submitClassName?: string;
}

function Form({
  fields,
  values,
  errors = {},
  onChange,
  onSubmit,
  submitLabel = "Send",
  className = "",
  submitClassName = "mt-2 w-full rounded-xl bg-gray-800 px-4 py-3 font-medium text-white transition hover:bg-gray-700"
}: FormProps) {
  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-5 ${className}`}>
      {fields.map((field) => {
        const commonProps = {
          key: field.name,
          label: field.label,
          required: field.required,
          disabled: field.disabled,
          className: field.className,
          error: errors[field.name]
        };

        if (field.type === "select") {
          return (
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
        }

        return (
          <FieldInputSingle
            {...commonProps}
            type={field.type}
            value={values[field.name] ?? ""}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        );
      })}

      <button
        type="submit"
        className={submitClassName}
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default Form;