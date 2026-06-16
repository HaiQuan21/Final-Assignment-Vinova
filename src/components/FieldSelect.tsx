function FieldSelect({
    label,
    name,
    value,
    onChange,
    options = [],
    error,
    disabled = false,
    required = false,
    className = ""
  }) {
    return (
      <div className="w-full">
        {/* Label */}
        <label className="block mb-2 text-lg font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
  
        {/* Select */}
        <select
          name={name}
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
            outline-none
            transition
            focus:border-gray-500
            ${error ? "border-red-500" : ""}
            ${className}
          `}
        >
          <option value="" disabled>
            -- Chọn {String(label).toLowerCase()} --
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
  
        {/* Error */}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
  
  export default FieldSelect;