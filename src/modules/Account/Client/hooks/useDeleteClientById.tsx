import { useState } from "react";
import { toast } from "react-toastify";
import { deleteUserById } from "../api/apiClient";
import type { Client } from "../../../../constants/MainObjectClass";

export function useDeleteClientById(onSuccess?: () => void) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (client: Client) => {
    setDeletingClient(client);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingClient || isDeleting) return;
    setIsDeleting(true);
    deleteUserById(deletingClient.id)
      .then((res) => {
        toast.success(res.data.message ?? "Deleted successfully.");
        setDeleteModalOpen(false);
        setDeletingClient(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred.");
      })
      .finally(() => setIsDeleting(false));
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDeletingClient(null);
  };

  return {
    deleteModalOpen, deletingClient, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  };
}