import Label from "./Label";

interface ToggleOption {
  value: string;
  label: string;
}

interface FieldToggleProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ToggleOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

function FieldToggle({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  className = "",
}: FieldToggleProps) {
  return (
    <div className={`w-full ${className}`}>
      <Label label={label} required={required} />
      <div className="flex overflow-hidden rounded-lg border-2 border-gray-300">
        {options.map((option, index) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors
                ${index !== 0 ? "border-l-2 border-gray-300" : ""}
                ${
                  isActive
                    ? "bg-[#3A0099] text-white"
                    : "bg-white text-[#3A0099] hover:bg-purple-50"
                }
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
  );
}

export default FieldToggle;