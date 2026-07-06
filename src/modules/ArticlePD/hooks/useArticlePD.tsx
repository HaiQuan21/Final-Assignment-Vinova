import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { useGetArticlePD } from "./useGetArticlePD";
import { useCreateArticlePD } from "./useCreateArticlePD";
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

  return {
    data,
    totalEntries,
    isLoading,
    sorting,
    setSorting,
    pagination,
    setPagination,
    fetchArticlePD,
    handleCreate,
    isSubmitting: isCreating,
  };
}
