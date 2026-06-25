import { useState } from "react";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { useGetArticles } from "./useGetArticle";
import { useCreateArticle } from "./useCreateArticle";
import { useEditArticle } from "./useEditArticle";
import { useDeleteArticle } from "./useDeleteArticle";
import { usePagination } from "../../../hooks/usePagination";

export function useArticle() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(8);
  const [refetchKey, setRefetchKey] = useState(0);
  const refetch = () => setRefetchKey((prev) => prev + 1);

  const { data, totalEntries, isLoading } = useGetArticles({
    pagination,
    sorting,
    refetchKey,
  });

  const { handleCreate, isSubmitting: isCreating } = useCreateArticle(refetch);

  const {
    editOpen,
    editingArticle,
    isSubmitting: isEditing,
    toFormValues,
    handleEditClick,
    handleEditSubmit,
    handleEditClose,
  } = useEditArticle(refetch);

  const {
    deleteModalOpen,
    deletingArticle,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useDeleteArticle(refetch);

  return {
    // Data
    data,
    totalEntries,
    isLoading,
    // Pagination & Sorting
    sorting,
    setSorting,
    pagination,
    setPagination,
    // Create
    handleCreate,
    isCreating,
    // Edit
    editOpen,
    editingArticle,
    isEditing,
    toFormValues,
    handleEditClick,
    handleEditSubmit,
    handleEditClose,
    // Delete
    deleteModalOpen,
    deletingArticle,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
}