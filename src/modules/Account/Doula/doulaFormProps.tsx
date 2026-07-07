
import type { FieldConfig } from "../../../constants/formTypes";
import { type DoulaUpdateFormValues } from "../../../schemas/doulaSchema";


export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

// Chỉ có Status dùng Form generic
// PhoneNumber dùng FieldPhoneNumber riêng nên không cần trong fields
export const doulaUpdateFields: FieldConfig[] = [
  {
        name: "phoneNumber",
        label: "Phone Number",
        type: "phone",
        countryCodeName: "countryCode",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: statusOptions,
    placeholder: "Select Status",
  },
];

export const doulaUpdateInitialValues: DoulaUpdateFormValues = {
  countryCode: "+61",
  phoneNumber: "",
  status: "active",
};

export interface DoulaFormProps {
  onSubmit: (values: DoulaUpdateFormValues) => void;
  isSubmitting?: boolean;
  defaultValues?: DoulaUpdateFormValues;
}