import Select, { type SingleValue } from "react-select";
import {
  type FieldSelectProps,
  type SelectOption,
} from "../constants/fieldProps";

function FieldSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  disabled = false,
  required = false,
  className = "",
  placeholder,
  isClearable = true,
}: FieldSelectProps) {
  // react-select làm việc với object { value, label }, nên cần map qua/lại
  // với "value" dạng string mà Form đang quản lý
  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  const handleChange = (option: SingleValue<SelectOption>) => {
    onChange(option ? option.value : "");
  };

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block mb-2 text-lg font-medium" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {/* React Select - click mở list, gõ để search option */}
      <Select<SelectOption>
        inputId={name}
        name={name}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isDisabled={disabled}
        isClearable={isClearable}
        isSearchable
        placeholder={placeholder || `-- Chọn ${label.toLowerCase()} --`}
        noOptionsMessage={() => "Không có kết quả"}
        unstyled
        className={className}
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
              isSelected
                ? "bg-gray-800 text-white"
                : isFocused
                  ? "bg-gray-100"
                  : "bg-white"
            }`,
          dropdownIndicator: () => "text-gray-400 px-2",
          clearIndicator: () =>
            "text-gray-400 hover:text-gray-600 px-1 cursor-pointer",
          indicatorSeparator: () => "bg-gray-200",
          loadingMessage: () => "px-4 py-2 text-gray-400",
          noOptionsMessage: () => "px-4 py-2 text-gray-400",
        }}
      />

      {/* Error */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FieldSelect;
