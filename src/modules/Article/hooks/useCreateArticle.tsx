import { useState } from "react";
import { toast } from "react-toastify";
import { createArticles } from "../api/apiArticle";
import type { ArticleFormValues } from "../articleFormProps";

export function useCreateArticle(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = (values: ArticleFormValues) => {
    setIsSubmitting(true);
    createArticles({
      title: values.title,
      content: values.content,
      picture: values.image,
      status: values.status,
      author: values.author,
      categoryId: values.category,
      timeToRead: Number(values.duration),
      type: "article",
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