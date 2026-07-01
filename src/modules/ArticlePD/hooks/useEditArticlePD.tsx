import { useState } from "react";
import { toast } from "react-toastify";
import { updateArticlePD } from "../api/apiArticlePD";
import type { ArticlePD } from "../../../constants/MainObjectClass";
import type { ArticlePDFormValues } from "../articlepdFormProps";
import { DEFAULT_IMAGE_URL } from "../articlepdFormProps";
import { getArticlePDById } from "../api/apiArticlePD";

export function useEditArticlePD(type:"article" | "pd",onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticlePD | null>(null);

  const toFormValues = (article: ArticlePD): ArticlePDFormValues => ({
    title: article.title ?? "",
    author: article.author ?? "",
    status: article.status ?? "",
    category: article.categoryId ?? "",
    duration: String(article.timeToRead ?? ""),
    image: (article.picture as any)?.uri ?? DEFAULT_IMAGE_URL,
    content: article.content ?? "",
  });

  const handleEditClick = (article: ArticlePD) => {
    setIsFetching(true);
    setEditOpen(true);
    getArticlePDById(article.id)
      .then(({ data: res }) => {
        setEditingArticle(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load article data.");
        setEditOpen(false);
      })
      .finally(() => setIsFetching(false));
    setEditOpen(true);
  };

  const handleEditSubmit = (values: ArticlePDFormValues) => {
    if (!editingArticle) return;
    setIsSubmitting(true);
    updateArticlePD(editingArticle.id, {
      title: values.title,
      content: values.content,
      picture: values.image,
      status: values.status,
      categoryId: values.category,
      timeToRead: Number(values.duration),
      type: type,
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
    isFetching
  };
}