import { useState } from "react";
import { toast } from "react-toastify";
import { deleteCategories } from "../api/apiCategory";
import type { Category } from "../../../constants/MainObjectClass";

export function useDeleteCategories(onSuccess?: () => void) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (category: Category) => {
    setDeletingCategory(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingCategory || isDeleting) return;
    setIsDeleting(true);
    deleteCategories([deletingCategory.id])
      .then((res) => {
        toast.success(res.data.message ?? "Deleted successfully.");
        setDeleteModalOpen(false);
        setDeletingCategory(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      })
      .finally(() => setIsDeleting(false));
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDeletingCategory(null);
  };

  return {
    deleteModalOpen, deletingCategory, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  };
}