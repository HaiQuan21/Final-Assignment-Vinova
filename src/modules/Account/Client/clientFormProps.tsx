import type { FieldConfig } from "../../../constants/formTypes";
import type { ClientUpdateFormValues } from "../../../schemas/clientSchemas";
const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  
  export const clientUpdateFields: FieldConfig[] = [
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
  
  export interface ClientFormProps {
    onSubmit: (values: ClientUpdateFormValues) => void;
    isSubmitting?: boolean;
    defaultValues?: ClientUpdateFormValues;
  }