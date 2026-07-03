import type { FieldConfig } from "../../constants/formTypes";
import { DEFAULT_IMAGE_URL } from "../ArticlePD/articlepdFormProps";
import { type CategoryFormValues } from "../../schemas/categorySchema";
export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const categoryFields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "name", label: "Name", type: "text", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: statusOptions,
    placeholder: "Select Status",
  },
  { name: "image", label: "Image", type: "image" },
];

export const categoryInitialValues: CategoryFormValues = {
  title: "",
  name: "",
  status: "active",
  image: DEFAULT_IMAGE_URL,
};

export interface CategoryFormProps {
  onSubmit: (values: CategoryFormValues) => void;
  isSubmitting?: boolean;
  defaultValues?: CategoryFormValues;
}