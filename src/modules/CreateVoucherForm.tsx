import { useState } from "react";
import FieldInputSingle from "../components/FieldInputSingle";
import FieldSelect from "../components/FieldSelect";
import FieldTextArea from "../components/FieldTextArea";
import FieldDate from "../components/FieldDate";

const couponTypeOptions = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
];

export interface VoucherFormValues {
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
  const [errors, setErrors] = useState<Partial<Record<keyof VoucherFormValues, string>>>({});

  const setField = <K extends keyof VoucherFormValues>(key: K, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: (keyof VoucherFormValues)[] = [
      "code",
      "quantity",
      "typeOfCoupon",
      "amount",
      "condition",
      "conditionMaxDiscount",
    ];
    const nextErrors: typeof errors = {};
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
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-5">
        <FieldInputSingle
          label="Code"
          required
          maxLength={50}
          value={values.code}
          onChange={(e) => setField("code", e.target.value)}
          error={errors.code}
        />
        <FieldTextArea
          label="Description"
          rows={3}
          value={values.description}
          onChange={(e) => setField("description", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <FieldDate
            label="Start Date"
            value={values.startDate}
            onChange={(e) => setField("startDate", e.target.value)}
          />
          <FieldDate
            label="End Date"
            value={values.endDate}
            onChange={(e) => setField("endDate", e.target.value)}
          />
        </div>

        <FieldInputSingle
          label="Quantity"
          required
          type="number"
          value={values.quantity}
          onChange={(e) => setField("quantity", e.target.value)}
          error={errors.quantity}
        />
        <FieldSelect
          label="Type of coupon"
          name="typeOfCoupon"
          required
          placeholder="Select"
          options={couponTypeOptions}
          value={values.typeOfCoupon}
          onChange={(value) => setField("typeOfCoupon", value)}
          error={errors.typeOfCoupon}
        />
        <FieldInputSingle
          label="Amount"
          required
          type="number"
          suffix="$"
          value={values.amount}
          onChange={(e) => setField("amount", e.target.value)}
          error={errors.amount}
        />
        <FieldInputSingle
          label="Condition"
          required
          placeholder="Min of payment"
          value={values.condition}
          onChange={(e) => setField("condition", e.target.value)}
          error={errors.condition}
        />
        <FieldInputSingle
          label="Condition max of discount"
          required
          placeholder="Max of discount"
          value={values.conditionMaxDiscount}
          onChange={(e) => setField("conditionMaxDiscount", e.target.value)}
          error={errors.conditionMaxDiscount}
        />
      </div>

      <button
        type="submit"
        className="sticky bottom-0 -mx-6 mt-6 w-[calc(100%+3rem)] bg-[#3A0099] py-4 text-base font-semibold text-white transition hover:bg-[#2d0080]"
      >
        Create
      </button>
    </form>
  );
}

export default CreateVoucherForm;