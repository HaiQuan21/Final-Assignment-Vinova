import { useState } from "react";
import { toast } from "react-toastify";
import { deleteReviewById } from "../../api/Doula Reviews/apiDoulaReview";
import type { DoulaReview } from "../../../../../constants/MainObjectClass";

export function useDeleteDoulaReviewById(onSuccess?: () => void) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingDoula, setDeletingDoula] = useState<DoulaReview | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (doula: DoulaReview) => {
    setDeletingDoula(doula);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingDoula || isDeleting) return;
    setIsDeleting(true);
    deleteReviewById(deletingDoula.id)
      .then((res) => {
        toast.success(res.data.message ?? "Deleted successfully.");
        setDeleteModalOpen(false);
        setDeletingDoula(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      })
      .finally(() => setIsDeleting(false));
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDeletingDoula(null);
  };

  return {
    deleteModalOpen, deletingDoula, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  };
}