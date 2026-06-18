import { useState, type FormEvent } from "react";
import Form from "../components/Form";
import { type FormErrors } from "../constants/formTypes";
import {
  type CreateVoucherFormProps,
  type VoucherFormValues,
  initialValues,
  requiredFields,
  voucherFields,
} from "../constants/voucherFormProps";

function CreateVoucherForm({ onSubmit }: CreateVoucherFormProps) {
  const [values, setValues] = useState<VoucherFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    requiredFields.forEach((field) => {
      if (!values[field].trim()) nextErrors[field] = "Trường này là bắt buộc";
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit(values);
  };

  return (
    <Form
      fields={voucherFields}
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create"
      submitClassName="mt-2 w-full rounded-md bg-[#3A0099] px-4 py-3 font-semibold text-white transition hover:bg-[#2d0080]"
    />
  );
}

export default CreateVoucherForm;
