import { Controller } from "react-hook-form";
import Label from "./Label";
import type { FieldToggleProps } from "../constants/fieldProps";

function FieldToggle({
  name,
  control,
  label,
  options,
  error,
  required = false,
  disabled = false,
  className = "",
}: FieldToggleProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: rhfField }) => (
        <div className={`w-full ${className}`}>
          <Label label={label} required={required} />
          <div className="flex overflow-hidden rounded-lg border-2 border-gray-300">
            {options.map((option, index) => {
              const isActive = rhfField.value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => rhfField.onChange(option.value)}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors
                    ${index !== 0 ? "border-l-2 border-gray-300" : ""}
                    ${isActive ? "bg-[#3A0099] text-white" : "bg-white text-[#3A0099] hover:bg-purple-50"}
                    ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                  `}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      )}
    />
  );
}

export default FieldToggle;