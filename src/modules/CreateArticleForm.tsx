import { useState, type FormEvent } from "react";
import Form, { type FieldConfig, type FormErrors } from "../components/Form";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

const categoryOptions = [
  { value: "wellness", label: "Wellness" },
  { value: "nutrition", label: "Nutrition" },
  { value: "fitness", label: "Fitness" },
];

const articleFields: FieldConfig[] = [
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
    placeholder: "Select",
  },
  { name: "duration", label: "Duration (Ex: 3 mins)", type: "text", required: true },
  { name: "image", label: "Image", type: "text" },
  { name: "content", label: "Content", type: "textarea", required: true, rows: 6 },
];

const requiredFields = ["title", "author", "status", "category", "duration", "content"];

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

const initialValues: ArticleFormValues = {
  title: "",
  author: "",
  status: "",
  category: "",
  duration: "",
  image: "/link", // mặc định theo yêu cầu, thay cho upload file thật
  content: "",
};

interface CreateArticleFormProps {
  onSubmit: (values: ArticleFormValues) => void;
}

function CreateArticleForm({ onSubmit }: CreateArticleFormProps) {
  const [values, setValues] = useState<ArticleFormValues>(initialValues);
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
      fields={articleFields}
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create"
      submitClassName="mt-2 w-full rounded-md bg-[#3A0099] px-4 py-3 font-semibold text-white transition hover:bg-[#2d0080]"
    />
  );
}

export default CreateArticleForm;