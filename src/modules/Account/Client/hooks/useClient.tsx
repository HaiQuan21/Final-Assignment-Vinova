import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { usePagination } from "../../../../hooks/usePagination";
import { useGetListClient } from "./useGetListClient";
import { useUpdateClientById } from "./useUpdateClientById";
import { useDeleteClientById } from "./useDeleteClientById";

export function useClient() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(25);

  const { data, totalEntries, isLoading, fetchListClient } = useGetListClient({
    pagination,
    sorting,
  });

  const {
    editOpen, editingClient, isSubmitting: isEditing, isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
  } = useUpdateClientById(fetchListClient);

  const {
    deleteModalOpen, deletingClient, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  } = useDeleteClientById(fetchListClient);

  return {
    // Data
    data, totalEntries, isLoading,
    // Pagination & Sorting
    sorting, setSorting, pagination, setPagination,
    fetchListClient,
    // Edit
    editOpen, editingClient, isEditing, isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
    // Delete
    deleteModalOpen, deletingClient, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  };
}