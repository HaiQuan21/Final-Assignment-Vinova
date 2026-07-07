import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import Label from "./Label";

const countryCodes = [
  { code: "+61", flag: "🇦🇺", country: "AU" },
  { code: "+1",  flag: "🇺🇸", country: "US" },
  { code: "+84", flag: "🇻🇳", country: "VN" },
  { code: "+65", flag: "🇸🇬", country: "SG" },
  { code: "+44", flag: "🇬🇧", country: "GB" },
  { code: "+81", flag: "🇯🇵", country: "JP" },
  { code: "+82", flag: "🇰🇷", country: "KR" },
  { code: "+86", flag: "🇨🇳", country: "CN" },
];

interface FieldPhoneNumberProps {
  name: string;          // field phoneNumber
  countryCodeName: string; // field countryCode
  control: Control<any>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

function FieldPhoneNumber({
  name,
  countryCodeName,
  control,
  label = "Phone Number",
  required = false,
  disabled = false,
  error,
}: FieldPhoneNumberProps) {
  return (
    <div className="w-full">
      <Label label={label} required={required} />
      <div className={`flex overflow-hidden rounded border-2 transition ${
        error ? "border-red-500" : "border-gray-300 focus-within:border-gray-500"
      }`}>
        {/* Country code select */}
        <Controller
          name={countryCodeName}
          control={control}
          render={({ field }) => (
            <select
              value={field.value ?? "+61"}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={disabled}
              className="border-r border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-700 outline-none"
            >
              {countryCodes.map(({ code, flag, country }) => (
                <option key={code} value={code}>
                  {flag} {code}
                </option>
              ))}
            </select>
          )}
        />

        {/* Phone number input */}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              type="tel"
              placeholder="Phone Number"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={disabled}
              className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none"
            />
          )}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FieldPhoneNumber;