import { useState } from "react";
import { toast } from "react-toastify";
import { deleteMultipleArticles } from "../api/apiArticle";
import type { Article } from "../../../constants/MainObjectClass";

export function useDeleteArticle(onSuccess?: () => void) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingArticle, setDeletingArticle] = useState<Article | null>(null);

  const handleDeleteClick = (article: Article) => {
    setDeletingArticle(article);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingArticle) return;
    deleteMultipleArticles([deletingArticle.id])
      .then((res) => {
        toast.success(res.data.message ?? "Deleted successfully.");
        setDeleteModalOpen(false);
        setDeletingArticle(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      });
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDeletingArticle(null);
  };

  return {
    deleteModalOpen,
    deletingArticle,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
}