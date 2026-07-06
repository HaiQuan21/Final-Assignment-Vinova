import type { FieldConfig } from "../../../constants/formTypes";
import type { CreateAdminFormValues, UpdateAdminFormValues } from "../../../schemas/adminSchemas";
import { getCurrentUser } from "../../../lib/getCurrentUser";

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


export function getUpdateAdminFields(targetAdminId?: string): FieldConfig[] {
  const currentUser = getCurrentUser();
  const isSelf = !!targetAdminId && currentUser?.id === targetAdminId;

  return [
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      disabled: true,
      className: "bg-gray-200 cursor-not-allowed",
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
      maxLength: 25,
      width: "half",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
      maxLength: 25,
      width: "half",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      disabled: true,
      className: "bg-gray-200 cursor-not-allowed",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: statusOptions,
      placeholder: "Select Status",
      disabled: isSelf,
      className: isSelf ? "bg-gray-200 cursor-not-allowed opacity-60" : "",
    },
    { name: "password", label: "Password", type: "password" },
  ];
}

export const updateAdminFields: FieldConfig[] = getUpdateAdminFields();

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
  targetAdminId?: string; // ← thêm để AdminForm biết đang edit ai
}