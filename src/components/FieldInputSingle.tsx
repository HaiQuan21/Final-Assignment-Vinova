import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Label from "./Label";
import type { FieldInputSingleProps } from "../constants/fieldProps";

function FieldInputSingle({
  name,
  control,
  label,
  type = "text",
  error,
  disabled = false,
  className = "",
  required = false,
  placeholder,
  suffix,
  maxLength,
}: FieldInputSingleProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: rhfField }) => (
        <div className="w-full">
          <Label label={label} required={required} />
          <div className="relative">
            <input
              type={inputType}
              placeholder={placeholder ?? label}
              value={rhfField.value ?? ""}
              onChange={(e) => rhfField.onChange(e.target.value)}
              disabled={disabled}
              maxLength={maxLength}
              className={`w-full rounded border-2 border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-gray-500
                ${error ? "border-red-500" : ""}
                ${className}
              `}
            />

            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
              </button>
            )}

            {suffix && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {suffix}
              </span>
            )}

            {maxLength !== undefined && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                {(rhfField.value ?? "").length}/{maxLength}
              </span>
            )}
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      )}
    />
  );
}

export default FieldInputSingle;