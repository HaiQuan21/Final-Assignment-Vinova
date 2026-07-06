import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Form from "../../components/Form";

import { type ArticlePDFormValues,initialValues,articlepdFields } from "./articlepdFormProps";
import { articleSchema } from "../../schemas/articleSchema";
import { getAllCategories } from "../Category/api/apiCategory";

interface ArticleFormProps {
  onSubmit: (values: ArticlePDFormValues) => void;
  isSubmitting?: boolean;
  defaultValues?: ArticlePDFormValues; // có → Edit mode, không có → Create mode
}

function ArticleFormPD({
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
    () => articlepdFields(categoryOptions),
    [categoryOptions]
  );

  return (
    <Form
      schema={articleSchema}
      fields={reBuildArticleFields}
      defaultValues={defaultValues ?? initialValues}
      onSubmit={onSubmit}
      submitLabel={isEditMode ? "Save Changes" : "Create"} // ← dynamic label
      submitStyleType={isEditMode ? "save" : "create"}
      submitDisabled={isSubmitting}
    />
  );
}

export default ArticleFormPD;