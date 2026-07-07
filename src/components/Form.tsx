import type { ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form"; // ← bỏ Controller
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
import FieldImage from "./FieldImage";
import Button from "./Button";
import FieldPhoneNumber from "./FieldPhoneNumber";

function Form<T extends FormValues>({
  schema,
  fields,
  defaultValues,
  onSubmit,
  submitLabel = "Send",
  submitStyleType,
  submitClassName,
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

  const watchedValues = useWatch({ control });

  const renderField = (field: FieldConfig): ReactNode => {
    const errorMessage = (errors as any)[field.name]?.message as
      | string
      | undefined;
    const currentValue = String((watchedValues as any)?.[field.name] ?? "");

    // Props chung truyền xuống field — control và name thay thế cho Controller bên ngoài
    const commonProps = {
      name: field.name,
      control,
      label: field.label,
      required: field.required,
      disabled: field.disabled || isSubmitting,
      className: field.className,
      error: errorMessage,
    };

    switch (field.type) {
      case "select":
        return (
          <>
            <FieldSelect
              {...commonProps}
              options={field.options}
              placeholder={field.placeholder}
              isClearable={field.isClearable}
            />
            {field.renderHint?.(currentValue)}
          </>
        );

      case "textarea":
        return (
          <>
            <FieldTextArea
              {...commonProps}
              placeholder={field.placeholder}
              rows={field.rows}
            />
            {field.renderHint?.(currentValue)}
          </>
        );

      case "date":
        return (
          <>
            <FieldDate {...commonProps} />
            {field.renderHint?.(currentValue)}
          </>
        );

      case "toggle":
        return (
          <>
            <FieldToggle {...commonProps} options={field.options} />
            {field.renderHint?.(currentValue)}
          </>
        );

      case "image":
        return (
          <>
            <FieldImage {...commonProps} placeholder={field.placeholder} />
            {field.renderHint?.(currentValue)}
          </>
        );
        
        case "phone":
          return (
            <>
              <FieldPhoneNumber
                name={field.name}
                countryCodeName={field.countryCodeName}
                control={control}
                label={field.label}
                required={field.required}
                disabled={field.disabled || isSubmitting}
                error={errorMessage}
              />
              {field.renderHint?.(currentValue)}
            </>
          );

      default:
        // text | email | password | number | tel | image
        return (
          <>
            <FieldInputSingle
              {...commonProps}
              type={field.type}
              placeholder={field.placeholder}
              suffix={field.suffix}
              maxLength={field.maxLength}
            />
            {field.renderHint?.(currentValue)}
          </>
        );
    }
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

      <Button
        type="submit"
        styleType={submitStyleType}
        isLoading={isSubmitting}
        disabled={submitDisabled || isSubmitting}
        className={`w-full ${submitClassName}`}
      >
        {submitLabel}
      </Button>
    </form>
  );
}

export default Form;
