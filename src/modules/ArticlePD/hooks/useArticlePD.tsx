import { useState } from "react";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { useGetArticlePD } from "./useGetArticlePD";
import { useCreateArticlePD } from "./useCreateArticlePD";
import { useEditArticlePD } from "./useEditArticlePD";
import { useDeleteArticlePD } from "./useDeleteArticlePD";
import { usePagination } from "../../../hooks/usePagination";

export function useArticlePD(type: "article" | "pd") {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(8);

  const { data, totalEntries, isLoading, fetchArticlePD } = useGetArticlePD({
    pagination,
    sorting,
    type,
  });

  const { handleCreate, isSubmitting: isCreating } = useCreateArticlePD(
    type,
    fetchArticlePD,
  );

  const {
    editOpen,
    editingArticle,
    isSubmitting: isEditing,
    toFormValues,
    handleEditClick,
    handleEditSubmit,
    handleEditClose,
  } = useEditArticlePD(type, fetchArticlePD);

  const {
    deleteModalOpen,
    deletingArticle,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useDeleteArticlePD(fetchArticlePD);

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
