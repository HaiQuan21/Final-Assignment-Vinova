import { useState } from "react";
import { toast } from "react-toastify";
import { deleteAdminById } from "../api/apiAdmin";
import type { AdminItem } from "../../../../constants/MainObjectClass";

export function useDeleteAdminById(onSuccess?: () => void) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<AdminItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDeleteClick = (admin: AdminItem) => {
    setDeletingAdmin(admin);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingAdmin) return;
    setIsDeleting(true);
    deleteAdminById(deletingAdmin.id)
      .then((res) => {
        toast.success(res.data.message ?? "Deleted successfully.");
        setDeleteModalOpen(false);
        setDeletingAdmin(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      });
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDeletingAdmin(null);
  };

  return {
    deleteModalOpen, deletingAdmin,isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  };
}