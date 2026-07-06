import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { usePagination } from "../../../../hooks/usePagination";
import { useGetAllAdmin } from "./useGetAllAdmin";


export function useAdmin() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(25);

  const { data, totalEntries, isLoading, fetchAllAdmin } = useGetAllAdmin({
    pagination,
    sorting,
  });

  return {
    data, totalEntries, isLoading,
    sorting, setSorting,
    pagination, setPagination,
    fetchAllAdmin,
  };
}