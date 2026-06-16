function Label({label,required}) {
  return (
    <label className="block mb-2 text-lg font-medium">
    {label}
    {required && <span className="text-red-500">*</span>}
  </label>
  )
}

export default Label