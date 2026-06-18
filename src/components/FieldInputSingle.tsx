import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Label from "./Label";
export type InputFieldType = "text" | "email" | "password" | "number" | "tel";

interface FieldInputSingleProps {
  label: string;
  type?: InputFieldType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  placeholder?: string;
  suffix?: string; //các kí tự đặc biệt hiện bên phải
  maxLength?: number; //số đếm kí tự
}

function FieldInputSingle({
  label,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  className = "",
  required = false,
  placeholder,
  suffix,
  maxLength,
}: FieldInputSingleProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      {/* Label */}
      <Label label={label} required={required} />
      {/* Input Wrapper */}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder ?? label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          className={`w-full rounded border-2 border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-gray-500
          ${error ? "border-red-500" : ""}
          ${className}
          `}
        />

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
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
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {/* Error */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FieldInputSingle;
