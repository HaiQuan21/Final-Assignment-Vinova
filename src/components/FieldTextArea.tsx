import Label from "./Label";
import type { FieldTextAreaProps } from "../constants/fieldProps";

function FieldTextArea({
  label,
  value,
  onChange,
  error,
  disabled = false,
  className = "",
  required = false,
  placeholder,
  rows = 4,
}: FieldTextAreaProps) {
  return (
    <div className="w-full">
      <Label label={label} required={required} />
      <textarea
        placeholder={placeholder ?? label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full resize-none rounded border-2 border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500
        ${error ? "border-red-500" : ""}
        ${className}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FieldTextArea;
