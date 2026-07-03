import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import Label from "./Label";

interface FieldImageProps {
  name: string;
  control: Control<any>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  placeholder?: string;
}

function FieldImage({
  name,
  control,
  label,
  required = false,
  disabled = false,
  className = "",
  error,
  placeholder,
}: FieldImageProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: rhfField }) => (
        <div className={`w-full ${className}`}>
          <Label label={label} required={required} />
          {/* Preview ảnh khi có URL hợp lệ */}
          {rhfField.value && (
            <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={rhfField.value}
                alt="Preview"
                className="h-40 w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                onLoad={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "block";
                }}
              />
            </div>
          )}
        </div>
      )}
    />
  );
}

export default FieldImage;