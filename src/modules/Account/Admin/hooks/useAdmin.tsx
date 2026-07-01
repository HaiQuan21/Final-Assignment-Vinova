import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { usePagination } from "../../../../hooks/usePagination";
import { useGetAllAdmin } from "./useGetAllAdmin";
import { useCreateAdmin } from "./useCreateAdmin";
import { useUpdateAdminById } from "./useUpdateAdminById";
import { useDeleteAdminById } from "./useDeleteAdminById";

export function useAdmin() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(25);

  const { data, totalEntries, isLoading, fetchAllAdmin } = useGetAllAdmin({
    pagination,
    sorting,
  });

  const { handleCreate, isSubmitting: isCreating } = useCreateAdmin(fetchAllAdmin);

  const {
    editOpen, editingAdmin, isSubmitting: isEditing,  
    isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
  } = useUpdateAdminById(fetchAllAdmin);

  const {
    deleteModalOpen, deletingAdmin,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel, isDeleting,
  } = useDeleteAdminById(fetchAllAdmin);

  return {
    data, totalEntries, isLoading,
    sorting, setSorting, pagination, setPagination,
    handleCreate, isCreating,
    editOpen, editingAdmin, isEditing,isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
    deleteModalOpen, deletingAdmin,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel, isDeleting,
  };
}