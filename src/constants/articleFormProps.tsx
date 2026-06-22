import { type FieldConfig } from "./formTypes";


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

export function articleFields(
  categoryOptions: { value: string; label: string }[]
): FieldConfig[] {
  return [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "author", label: "Author", type: "text", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: statusOptions,
    placeholder: "Select Status",
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: categoryOptions,
    placeholder:  categoryOptions.length === 0 ? "Loading..." : "Select",
  },
  {
    name: "duration",
    label: "Duration (Ex: 3 mins)",
    type: "text",
    required: true,
  },
  { name: "image", label: "Image", type: "text" },
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

export interface ArticleFormValues {
  [key: string]: string;
  title: string;
  author: string;
  status: string;
  category: string;
  duration: string;
  image: string;
  content: string;
}

export const initialValues: ArticleFormValues = {
  title: "",
  author: "",
  status: "",
  category: "",
  duration: "",
  image:
    "https://s3.ap-southeast-1.amazonaws.com/nurturewave-be-dev/uploads%2Fimages%2F0b8821d6-1a35-4986-af30-232f74a04b51_download+(2).jpeg", // mặc định theo yêu cầu, thay cho upload file thật
  content: "",
};

export interface CreateArticleFormProps {
  onSubmit: (values: ArticleFormValues) => void;
  isSubmitting?: boolean;
}
