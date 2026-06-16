import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Label from "./Label";

function FieldInputSingle({
  label,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  className = "",
  required = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      <Label label={label} required={required}/>

      {/* Input Wrapper */}
      <div className="relative">
        <input
          type={inputType}
          placeholder={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full
            rounded-xl
            border-2
            border-gray-300
            px-4
            py-3
            pr-12
            outline-none
            transition
            focus:border-gray-500
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
      </div>

      {/* Error */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FieldInputSingle;
