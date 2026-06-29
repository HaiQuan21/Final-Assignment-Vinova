import { useState } from "react";
import { toast } from "react-toastify";
import { createArticlePD } from "../api/apiArticlePD";
import type { ArticlePDFormValues } from "../articlepdFormProps";

export function useCreateArticlePD(type: "article" | "pd",onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = (values: ArticlePDFormValues) => {
    setIsSubmitting(true);
    createArticlePD({
      title: values.title,
      content: values.content,
      picture: values.image,
      status: values.status,
      author: values.author,
      categoryId: values.category,
      timeToRead: Number(values.duration),
      type: type,
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