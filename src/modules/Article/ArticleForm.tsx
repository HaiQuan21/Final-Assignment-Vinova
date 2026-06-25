import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Form from "../../components/Form";

import { type ArticleFormValues,initialValues,articleFields } from "./articleFormProps";
import { articleSchema } from "../../schemas/articleSchema";
import { getAllCategories } from "../../api/apiService";

interface ArticleFormProps {
  onSubmit: (values: ArticleFormValues) => void;
  isSubmitting?: boolean;
  defaultValues?: ArticleFormValues; // có → Edit mode, không có → Create mode
}

function ArticleForm({
  onSubmit,
  isSubmitting = false,
  defaultValues,
}: ArticleFormProps) {
  const isEditMode = !!defaultValues; // true = Edit, false = Create
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

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
        console.log("Data Article trả về",res)
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

  return (
    <Form
      schema={articleSchema}
      fields={reBuildArticleFields}
      defaultValues={defaultValues ?? initialValues}
      onSubmit={onSubmit}
      submitLabel={isEditMode ? "Save Changes" : "Create"} // ← dynamic label
      submitClassName={`mt-2 w-full rounded-md px-4 py-3 font-semibold text-white transition ${
        isSubmitting
          ? "bg-[#3A0099]/60 cursor-not-allowed"
          : "bg-[#3A0099] hover:bg-[#270165]"
      }`}
      submitDisabled={isSubmitting}
    />
  );
}

export default ArticleForm;