import { useState } from "react";
import { toast } from "react-toastify";
import { updateArticle } from "../api/apiArticle";
import type { Article } from "../../../constants/MainObjectClass";
import type { ArticleFormValues } from "../articleFormProps";
import { DEFAULT_IMAGE_URL } from "../articleFormProps";

export function useEditArticle(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const toFormValues = (article: Article): ArticleFormValues => ({
    title: article.title ?? "",
    author: article.author ?? "",
    status: article.status ?? "",
    category: article.categoryId ?? "",
    duration: String(article.timeToRead ?? ""),
    image: (article.picture as any)?.uri ?? DEFAULT_IMAGE_URL,
    content: article.content ?? "",
  });

  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
    setEditOpen(true);
  };

  const handleEditSubmit = (values: ArticleFormValues) => {
    if (!editingArticle) return;
    setIsSubmitting(true);
    updateArticle(editingArticle.id, {
      title: values.title,
      content: values.content,
      picture: values.image,
      status: values.status,
      categoryId: values.category,
      timeToRead: Number(values.duration),
      type: "article",
    })
      .then((res) => {
        toast.success(res.data.message);
        setEditOpen(false);
        setEditingArticle(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingArticle(null);
  };

  return {
    editOpen,
    editingArticle,
    isSubmitting,
    toFormValues,
    handleEditClick,
    handleEditSubmit,
    handleEditClose,
  };
}