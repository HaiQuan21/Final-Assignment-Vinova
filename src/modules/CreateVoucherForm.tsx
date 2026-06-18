import { useState, type FormEvent } from "react";
import Form, { type FieldConfig, type FormErrors } from "../components/Form";

const couponTypeOptions = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
];

const voucherFields: FieldConfig[] = [
  { name: "code", label: "Code", type: "text", required: true, maxLength: 50 },
  { name: "description", label: "Description", type: "textarea", rows: 3 },
  { name: "startDate", label: "Start Date", type: "date", width: "half" },
  { name: "endDate", label: "End Date", type: "date", width: "half" },
  { name: "quantity", label: "Quantity", type: "number", required: true },
  {
    name: "typeOfCoupon",
    label: "Type of coupon",
    type: "select",
    required: true,
    options: couponTypeOptions,
    placeholder: "Select",
  },
  { name: "amount", label: "Amount", type: "number", required: true, suffix: "$" },
  {
    name: "condition",
    label: "Condition",
    type: "text",
    required: true,
    placeholder: "Min of payment",
  },
  {
    name: "conditionMaxDiscount",
    label: "Condition max of discount",
    type: "text",
    required: true,
    placeholder: "Max of discount",
  },
];

const requiredFields = [
  "code",
  "quantity",
  "typeOfCoupon",
  "amount",
  "condition",
  "conditionMaxDiscount",
];

export interface VoucherFormValues {
  [key: string]: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  quantity: string;
  typeOfCoupon: string;
  amount: string;
  condition: string;
  conditionMaxDiscount: string;
}

const toInputDate = (date: Date) => date.toISOString().split("T")[0];
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const initialValues: VoucherFormValues = {
  code: "",
  description: "",
  startDate: toInputDate(today),
  endDate: toInputDate(tomorrow),
  quantity: "",
  typeOfCoupon: "",
  amount: "",
  condition: "",
  conditionMaxDiscount: "",
};

interface CreateVoucherFormProps {
  onSubmit: (values: VoucherFormValues) => void;
}

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