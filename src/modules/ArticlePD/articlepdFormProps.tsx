import { type FieldConfig } from "../../constants/formTypes";

export const statusOptions = [
  { value: "published", label: "Published" },
  { value: "unpublished", label: "Unpublished" },
  { value: "draft", label: "Draft" },
];

export const categoryOptions = [
  { value: "wellness", label: "Wellness" },
  { value: "nutrition", label: "Nutrition" },
  { value: "fitness", label: "Fitness" },
];

export function articlepdFields(
  categoryOptions: { value: string; label: string }[],
): FieldConfig[] {
  return [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "author", label: "Author", type: "text", required: true },
    {
      name: "status",
      label: "Status",
      type: "toggle",
      required: true,
      options: statusOptions,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: categoryOptions,
      placeholder: categoryOptions.length === 0 ? "Loading..." : "Select",
    },
    {
      name: "duration",
      label: "Duration (Ex: '3' = 3 mins)",
      type: "number",
      required: true,
    },
    { name: "image", label: "Image", type: "image" },
    {
      name: "content",
      label: "Content",
      type: "textarea",
      required: true,
      rows: 6,
    },
  ];
}

export const requiredFields = [
  "title",
  "author",
  "status",
  "category",
  "duration",
  "content",
];

export interface ArticlePDFormValues {
  [key: string]: string;
  title: string;
  author: string;
  status: string;
  category: string;
  duration: string;
  image: string;
  content: string;
}

export const DEFAULT_IMAGE_URL = "https://s3.ap-southeast-1.amazonaws.com/nurturewave-be-dev/uploads%2Fimages%2F0b8821d6-1a35-4986-af30-232f74a04b51_download+(2).jpeg";

export const initialValues: ArticlePDFormValues = {
  title: "",
  author: "",
  status: "",
  category: "",
  duration: "0",
  image: DEFAULT_IMAGE_URL,
  content: "",
};

export interface CreateArticlePDFormProps {
  onSubmit: (values: ArticlePDFormValues) => void;
  isSubmitting?: boolean;
}
