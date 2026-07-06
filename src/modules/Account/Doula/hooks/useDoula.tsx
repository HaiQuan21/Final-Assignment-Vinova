import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { usePagination } from "../../../../hooks/usePagination";
import { useGetListOfDoula } from "./useGetListOfDoula";
import { useGetDoulaDetailById } from "./useGetDoulaDetailById";
import { useUpdateDoulaById } from "./useUpdateDoulaById";
import { useDeleteDoulaById } from "./useDeleteDoulaById";

export function useDoula() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(8);

  const { data, totalEntries, isLoading, fetchListOfDoulas } = useGetListOfDoula({
    pagination,
    sorting,
  });

  const { fetchDoulaDetailById } = useGetDoulaDetailById();

  const {
    editOpen, editingDoula, isSubmitting: isEditing, isFetching,
    handleEditClick, handleEditSubmit, handleEditClose,
  } = useUpdateDoulaById(fetchListOfDoulas);

  const {
    deleteModalOpen, deletingDoula, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  } = useDeleteDoulaById(fetchListOfDoulas);

  return {
    // Data
    data, totalEntries, isLoading,
    // Pagination & Sorting
    sorting, setSorting, pagination, setPagination,
    // Get Detail
    fetchDoulaDetailById,
    // Edit
    editOpen, editingDoula, isEditing, isFetching,
    handleEditClick, handleEditSubmit, handleEditClose,
    // Delete
    deleteModalOpen, deletingDoula, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  };
}