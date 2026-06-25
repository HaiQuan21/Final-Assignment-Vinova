import { type FieldConfig } from "../../constants/formTypes";
export const couponTypeOptions = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
];

export const voucherFields: FieldConfig[] = [
  { name: "code", label: "Code", type: "text", required: true, maxLength: 50 },
  { name: "description", label: "Description", type: "textarea", rows: 3,required: true },
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
  {
    name: "amount",
    label: "Amount",
    type: "number",
    required: true,
    suffix: "$",
  },
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

export const requiredFields = [
  "code",
  "quantity",
  "typeOfCoupon",
  "amount",
  "condition",
  "conditionMaxDiscount",
  "description"
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

export const toInputDate = (date: Date) => date.toISOString().split("T")[0];
export const today = new Date();
export const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

export const initialValues: VoucherFormValues = {
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

export interface CreateVoucherFormProps {
  onSubmit: (values: VoucherFormValues) => void;
}
