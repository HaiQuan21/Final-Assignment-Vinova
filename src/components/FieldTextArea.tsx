import { Controller } from "react-hook-form";
import Label from "./Label";
import type { FieldTextAreaProps } from "../constants/fieldProps";

function FieldTextArea({
  name,
  control,
  label,
  error,
  disabled = false,
  className = "",
  required = false,
  placeholder,
  rows = 4,
}: FieldTextAreaProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: rhfField }) => (
        <div className="w-full">
          <Label label={label} required={required} />
          <textarea
            placeholder={placeholder ?? label}
            value={rhfField.value ?? ""}
            onChange={(e) => rhfField.onChange(e.target.value)}
            disabled={disabled}
            rows={rows}
            className={`w-full resize-none rounded border-2 border-gray-300 hover:border-[#4A15AD] px-4 py-3 outline-none transition focus:border-gray-500
              ${error ? "border-red-500" : ""}
              ${className}
            `}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      )}
    />
  );
}

export default FieldTextArea;