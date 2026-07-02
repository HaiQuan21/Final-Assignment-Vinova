import { Controller } from "react-hook-form";
import Select, { type SingleValue } from "react-select";
import type { FieldSelectProps, SelectOption } from "../constants/fieldProps";
import Label from "./Label";

function FieldSelect({
  name,
  control,
  label,
  options,
  error,
  disabled = false,
  required = false,
  placeholder,
  isClearable = true,
}: FieldSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: rhfField }) => {
        const selectedOption = options.find((opt) => opt.value === rhfField.value) ?? null;

        return (
          <div className="w-full">
            <label className="mb-2 block text-lg font-medium" htmlFor={name}>
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
            <Select<SelectOption>
              inputId={name}
              name={name}
              value={selectedOption}
              onChange={(option: SingleValue<SelectOption>) =>
                rhfField.onChange(option ? option.value : "")
              }
              options={options}
              isDisabled={disabled}
              isClearable={isClearable}
              isSearchable
              placeholder={placeholder || `-- Chọn ${label.toLowerCase()} --`}
              noOptionsMessage={() => "Không có kết quả"}
              unstyled
              classNames={{
                control: ({ isFocused }) =>
                  `rounded-xl border-2 px-3 py-1.5 transition ${
                    error
                      ? "border-red-500"
                      : isFocused
                        ? "border-gray-500"
                        : "border-gray-300"
                  }`,
                placeholder: () => "text-gray-400",
                input: () => "text-base",
                singleValue: () => "text-gray-900",
                menu: () =>
                  "mt-2 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-10",
                menuList: () => "py-1",
                option: ({ isFocused, isSelected }) =>
                  `px-4 py-2 cursor-pointer ${
                    isSelected ? "bg-gray-800 text-white" : isFocused ? "bg-gray-100" : "bg-white"
                  }`,
                dropdownIndicator: () => "text-gray-400 px-2",
                clearIndicator: () => "text-gray-400 hover:text-gray-600 px-1 cursor-pointer",
                indicatorSeparator: () => "bg-gray-200",
                noOptionsMessage: () => "px-4 py-2 text-gray-400",
              }}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
      }}
    />
  );
}

export default FieldSelect;