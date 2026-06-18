import { useState } from "react";
import FieldInputSingle from "../components/FieldInputSingle";
import FieldSelect from "../components/FieldSelect";
import FieldTextArea from "../components/FieldTextArea";

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

export interface ArticleFormValues {
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
  const [errors, setErrors] = useState<Partial<Record<keyof ArticleFormValues, string>>>({});

  const setField = <K extends keyof ArticleFormValues>(key: K, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: (keyof ArticleFormValues)[] = [
      "title",
      "author",
      "status",
      "category",
      "duration",
      "content",
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
          label="Title"
          required
          value={values.title}
          onChange={(e) => setField("title", e.target.value)}
          error={errors.title}
        />
        <FieldInputSingle
          label="Author"
          required
          value={values.author}
          onChange={(e) => setField("author", e.target.value)}
          error={errors.author}
        />
        <FieldSelect
          label="Status"
          name="status"
          required
          placeholder="Select Status"
          options={statusOptions}
          value={values.status}
          onChange={(value) => setField("status", value)}
          error={errors.status}
        />
        <FieldSelect
          label="Category"
          name="category"
          required
          placeholder="Select"
          options={categoryOptions}
          value={values.category}
          onChange={(value) => setField("category", value)}
          error={errors.category}
        />
        <FieldInputSingle
          label="Duration (Ex: 3 mins)"
          required
          value={values.duration}
          onChange={(e) => setField("duration", e.target.value)}
          error={errors.duration}
        />
        <FieldInputSingle
          label="Image"
          value={values.image}
          onChange={(e) => setField("image", e.target.value)}
        />
        <FieldTextArea
          label="Content"
          required
          rows={6}
          value={values.content}
          onChange={(e) => setField("content", e.target.value)}
          error={errors.content}
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

export default CreateArticleForm;