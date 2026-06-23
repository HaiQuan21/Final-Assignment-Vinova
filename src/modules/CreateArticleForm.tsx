import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Form from "../components/Form";
import {
  type CreateArticleFormProps,
  type ArticleFormValues,
  initialValues,
  articleFields,
} from "../constants/articleFormProps";
import { articleSchema } from "../schemas/articleSchema";
import { getAllCategories } from "../api/apiService";

interface Props extends CreateArticleFormProps {
  isSubmitting?: boolean;
}

function CreateArticleForm({ onSubmit, isSubmitting = false }: Props) {
  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    getAllCategories()
      .then(({ data: res }) => {
        const options = res.data.map((cat: { id: string; name: string }) => ({
          value: cat.id,
          label:
            cat.name.charAt(0).toUpperCase() +
            cat.name.slice(1).toLowerCase(),
        }));
        setCategoryOptions(options);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ?? "Failed to load list of categories."
        );
      });
  }, []);

  const reBuildArticleFields = useMemo(
    () => articleFields(categoryOptions),
    [categoryOptions]
  );

  // onSubmit giờ nhận values trực tiếp từ RHF, không cần FormEvent nữa
  const handleSubmit = (values: ArticleFormValues) => {
    onSubmit(values);
  };

  return (
    <Form
      schema={articleSchema}
      fields={reBuildArticleFields}
      defaultValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel="Create"
      submitClassName={`mt-2 w-full rounded-md px-4 py-3 font-semibold text-white transition ${
        isSubmitting
          ? "bg-[#3A0099]/60 cursor-not-allowed"
          : "bg-[#3A0099] hover:bg-[#270165]"
      }`}
      submitDisabled={isSubmitting}
    />
  );
}

export default CreateArticleForm;