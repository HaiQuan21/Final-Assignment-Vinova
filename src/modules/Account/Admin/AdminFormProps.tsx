import type { FieldConfig } from "../../../constants/formTypes";
import type { CreateAdminFormValues, UpdateAdminFormValues } from "../../../schemas/adminSchemas";

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const createAdminFields: FieldConfig[] = [
  { name: "username", label: "Username", type: "text", required: true },
  { name: "firstName", label: "First Name", type: "text", required: true, maxLength: 25, width: "half" },
  { name: "lastName", label: "Last Name", type: "text", required: true, maxLength: 25, width: "half" },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: statusOptions,
    placeholder: "Select Status",
  },
  { name: "password", label: "Password", type: "password", required: true },
];

export const updateAdminFields: FieldConfig[] = [
  { name: "username", label: "Username", type: "text", required: true, disabled: true,className: "bg-gray-200 cursor-not-allowed" },
  { name: "firstName", label: "First Name", type: "text", required: true, maxLength: 25, width: "half" },
  { name: "lastName", label: "Last Name", type: "text", required: true, maxLength: 25, width: "half" },
  { name: "email", label: "Email", type: "email", required: true, disabled: true,className: "bg-gray-200 cursor-not-allowed" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: statusOptions,
    placeholder: "Select Status",
  },
  { name: "password", label: "Password", type: "password" },
];

export const createInitialValues: CreateAdminFormValues = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  status: "active",
  password: "",
};

export interface AdminFormProps {
  onSubmit: (values: CreateAdminFormValues | UpdateAdminFormValues) => void;
  isSubmitting?: boolean;
  defaultValues?: UpdateAdminFormValues;
}