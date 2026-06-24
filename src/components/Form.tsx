import type { ReactNode, ChangeEvent } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import FieldInputSingle from "./FieldInputSingle";
import FieldSelect from "./FieldSelect";
import FieldTextArea from "./FieldTextArea";
import FieldDate from "./FieldDate";
import FieldToggle from "./FieldToggle";
import {
  type FieldConfig,
  type FormValues,
  type FormProps,
  widthClass,
} from "../constants/formTypes";

function Form<T extends FormValues>({
  schema,
  fields,
  defaultValues,
  onSubmit,
  submitLabel = "Send",
  submitClassName = "mt-2 w-full rounded-xl bg-gray-800 px-4 py-3 font-medium text-white transition hover:bg-gray-700",
  submitDisabled = false,
  className = "",
}: FormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema as ZodType<T, any, any>),
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  // Controller tự update nên useWatch luôn có value mới nhất
  const watchedValues = useWatch({ control });

  const renderField = (field: FieldConfig): ReactNode => {
    const errorMessage = (errors as any)[field.name]?.message as
      | string
      | undefined;
    const currentValue = String((watchedValues as any)?.[field.name] ?? "");

    const commonProps = {
      label: field.label,
      required: field.required,
      disabled: field.disabled || isSubmitting,
      className: field.className,
      error: errorMessage,
    };

    let fieldElement: ReactNode;

    if (field.type === "select") {
      fieldElement = (
        <Controller
          name={field.name as any}
          control={control}
          render={({ field: rhfField }) => (
            <FieldSelect
              {...commonProps}
              name={field.name}
              options={field.options}
              placeholder={field.placeholder}
              isClearable={field.isClearable}
              value={rhfField.value ?? ""}
              onChange={(value) => rhfField.onChange(value)}
            />
          )}
        />
      );
    } else if (field.type === "textarea") {
      fieldElement = (
        <Controller
          name={field.name as any}
          control={control}
          render={({ field: rhfField }) => (
            <FieldTextArea
              {...commonProps}
              placeholder={(field as any).placeholder}
              rows={(field as any).rows}
              value={rhfField.value ?? ""}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                rhfField.onChange(e.target.value)
              }
            />
          )}
        />
      );
    } else if (field.type === "date") {
      fieldElement = (
        <Controller
          name={field.name as any}
          control={control}
          render={({ field: rhfField }) => (
            <FieldDate
              {...commonProps}
              value={rhfField.value ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                rhfField.onChange(e.target.value)
              }
            />
          )}
        />
      );
    } else if (field.type === "toggle") {
      fieldElement = (
        <Controller
          name={field.name as any}
          control={control}
          render={({ field: rhfField }) => (
            <FieldToggle
              {...commonProps}
              options={field.options}
              value={rhfField.value ?? ""}
              onChange={(value) => rhfField.onChange(value)}
            />
          )}
        />
      );
    } else {
      // text | email | password | number | tel
      fieldElement = (
        <Controller
          name={field.name as any}
          control={control}
          render={({ field: rhfField }) => (
            <FieldInputSingle
              {...commonProps}
              type={field.type as any}
              placeholder={(field as any).placeholder}
              suffix={(field as any).suffix}
              maxLength={(field as any).maxLength}
              value={rhfField.value ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                rhfField.onChange(e.target.value)
              }
            />
          )}
        />
      );
    }

    return (
      <>
        {fieldElement}
        {/* renderHint nhận currentValue realtime — PasswordChecklist dùng cái này */}
        {field.renderHint?.(currentValue)}
      </>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit as any)}
      className={`flex flex-col gap-5 ${className}`}
    >
      <div className="flex flex-wrap gap-5">
        {fields.map((field) => (
          <div key={field.name} className={widthClass[field.width ?? "full"]}>
            {renderField(field)}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitDisabled || isSubmitting}
        className={submitClassName}
      >
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}

export default Form;