import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { usePagination } from "../../../hooks/usePagination";
import { useGetVouchersDetail } from "./useGetVoucherDetail";
import { useGetListDoulaVoucher } from "./useGetListDoulaVoucher";

export function useVoucherDetail() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(5);

  const {
    data: vouchersDetail,
    isLoading: isVoucherDetailLoading,
    fetchVoucherDetail,
  } = useGetVouchersDetail();

  const {
    data: doulaVouchersDetail,
    totalEntries: doulaVoucherDetailTotal,
    isLoading: doulaVoucherDetailLoading,
  } = useGetListDoulaVoucher({ pagination, sorting });

  return {
    //VoucherDetail
    vouchersDetail,
    isVoucherDetailLoading,
    //ListVoucherDoula
    doulaVouchersDetail,
    doulaVoucherDetailTotal,
    doulaVoucherDetailLoading,
    // Pagination & Sorting
    sorting,
    setSorting,
    pagination,
    setPagination,
    fetchVoucherDetail,
  };
}
