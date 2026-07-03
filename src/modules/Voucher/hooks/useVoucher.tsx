import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { useGetVouchers } from "./useGetVoucher";
import { useCreateVoucher } from "./useCreateVoucher";
import { usePagination } from "../../../hooks/usePagination";
import { usePatchCareStatus } from "./usePatchCareStatus";

export function useVoucher() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(25);

  const { data, totalEntries, isLoading,fetchVoucher } = useGetVouchers({
    pagination,
    sorting,
  });

  const { handleCreate, isSubmitting: isCreating } = useCreateVoucher(fetchVoucher);

  const {
    handleToggleCancel,
    handleToggleClick,
    handleToggleConfirm,
    targetVoucher,
    confirmOpen,
  } = usePatchCareStatus(fetchVoucher);

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
    //PatchCareStatus
    handleToggleClick, handleToggleConfirm,
    handleToggleCancel,
    confirmOpen,
    targetVoucher,
  };
}