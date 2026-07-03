import { useState } from "react";
import { toast } from "react-toastify";
import { createCategories } from "../api/apiCategory";
import type { CategoryFormValues } from "../../../schemas/categorySchema";
import { DEFAULT_IMAGE_URL } from "../../ArticlePD/articlepdFormProps";

export function useCreateCategories(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = (values: CategoryFormValues) => {
    setIsSubmitting(true);
    createCategories({
      title: values.title,
      name: values.name,
      image: values.image ?? DEFAULT_IMAGE_URL,
      status: values.status,
    })
      .then((res) => {
        toast.success(res.data.message);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return { handleCreate, isSubmitting };
}