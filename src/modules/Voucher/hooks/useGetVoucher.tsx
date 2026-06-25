import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { getVouchers } from "../api/apiVoucher";
import type { Voucher } from "../../../constants/MainObjectClass";

interface UseGetVouchersParams {
  pagination: PaginationState;
  sorting: SortingState;
  refetchKey?: number;
}

export function useGetVouchers({ pagination, sorting, refetchKey = 0 }: UseGetVouchersParams) {
  const [data, setData] = useState<Voucher[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  useEffect(() => {
    setIsLoading(true);
    getVouchers({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      search: search || undefined,
      sort: sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
      })
      .finally(() => setIsLoading(false));
  }, [pagination.pageIndex, pagination.pageSize, sorting, search, refetchKey]);

  return { data, totalEntries, isLoading };
}