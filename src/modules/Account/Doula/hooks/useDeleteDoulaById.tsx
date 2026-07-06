import { useState } from "react";
import { toast } from "react-toastify";
import { deleteDoulaById } from "../api/apiDoula";
import type { Doula } from "../../../../constants/MainObjectClass";

export function useDeleteDoulaById(onSuccess?: () => void) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingDoula, setDeletingDoula] = useState<Doula | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (doula: Doula) => {
    setDeletingDoula(doula);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingDoula || isDeleting) return;
    setIsDeleting(true);
    deleteDoulaById(deletingDoula.id)
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