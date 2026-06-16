import Select from "react-select";
import Label from "./Label";

function FieldSelect({
  label,
  value,
  onChange,
  options = [],
  error,
  disabled = false,
  required = false,
  placeholder,
  isClearable = true
}) {
  // react-select làm việc với cả object { value, label }, nên cần map qua/lại
  const selectedOption = options.find((opt) => opt.value === value) || null;

  const handleChange = (option) => {
    onChange(option ? option.value : "");
  };

  const customStyles = {
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
    noOptionsMessage: () => "px-4 py-2 text-gray-400"
  }

  return (
    <div className="w-full">
      {/* Label */}
      <Label label={label} required={required}/>

      {/* React Select - click mở list, gõ để search option */}
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isDisabled={disabled}
        isClearable={isClearable}
        isSearchable
        placeholder={placeholder || `-- Chọn ${String(label).toLowerCase()} --`}
        noOptionsMessage={() => "No options"}
        unstyled
        classNames={customStyles}
      />

      {/* Error */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FieldSelect;