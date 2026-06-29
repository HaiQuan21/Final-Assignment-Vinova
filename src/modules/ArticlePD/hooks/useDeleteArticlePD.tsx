import { useState } from "react";
import { toast } from "react-toastify";
import { deleteMultipleArticlePD } from "../api/apiArticlePD";
import type { ArticlePD } from "../../../constants/MainObjectClass";

export function useDeleteArticlePD(onSuccess?: () => void) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingArticle, setDeletingArticle] = useState<ArticlePD | null>(null);

  const handleDeleteClick = (article: ArticlePD) => {
    setDeletingArticle(article);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingArticle) return;
    deleteMultipleArticlePD([deletingArticle.id])
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