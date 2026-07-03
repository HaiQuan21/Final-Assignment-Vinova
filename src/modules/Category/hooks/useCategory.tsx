import { useState, useEffect } from "react";
import type { SortingState } from "@tanstack/react-table";
import { usePagination } from "../../../hooks/usePagination";
import { useGetAllCategories } from "./useGetAllCategories";
import { useCreateCategories } from "./useCreateCategories";
import { useUpdateCategories } from "./useUpdateCategories";
import { useDeleteCategories } from "./useDeleteCategories";

export function useCategory() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(8);

  const { data, totalEntries, isLoading, fetchAllCategories } = useGetAllCategories({
    pagination,
    sorting,
  });

  const { handleCreate, isSubmitting: isCreating } = useCreateCategories(fetchAllCategories);

  const {
    editOpen, editingCategory, isSubmitting: isEditing, isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
  } = useUpdateCategories(fetchAllCategories);

  const {
    deleteModalOpen, deletingCategory, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  } = useDeleteCategories(fetchAllCategories);

  return {
    // Data
    data, totalEntries, isLoading,
    // Pagination & Sorting
    sorting, setSorting, pagination, setPagination,
    // Create
    handleCreate, isCreating,
    // Edit
    editOpen, editingCategory, isEditing, isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
    // Delete
    deleteModalOpen, deletingCategory, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  };
}