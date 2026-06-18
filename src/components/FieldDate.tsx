import { FaCalendarAlt } from "react-icons/fa";
import Label from "./Label";

interface FieldDateProps {
  label: string;
  value: string; // format yyyy-mm-dd theo input type="date"
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

function FieldDate({
  label,
  value,
  onChange,
  error,
  disabled = false,
  className = "",
  required = false,
}: FieldDateProps) {
  return (
    <div className="w-full">
      <Label label={label} required={required} />
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full rounded border-2 border-gray-300 px-4 py-3 pr-10 outline-none transition focus:border-gray-500
          [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:opacity-0
          ${error ? "border-red-500" : ""}
          ${className}
          `}
        />
        <FaCalendarAlt
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FieldDate;