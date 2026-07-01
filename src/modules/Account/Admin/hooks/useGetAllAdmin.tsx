import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { getAllAdmin } from "../api/apiAdmin";
import type { AdminItem } from "../../../../constants/MainObjectClass";

interface UseGetAllAdminParams {
  pagination: PaginationState;
  sorting: SortingState;
  refetchKey?: number;
}

export function useGetAllAdmin({ pagination, sorting, refetchKey = 0 }: UseGetAllAdminParams) {
  const [data, setData] = useState<AdminItem[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const fetchAllAdmin = useCallback(() => {
    setIsLoading(true);
    getAllAdmin({
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
  }, [pagination.pageIndex, pagination.pageSize, sorting, search]);

  useEffect(() => {
    fetchAllAdmin();
  }, [fetchAllAdmin, refetchKey]);

  return { data, totalEntries, isLoading, fetchAllAdmin };
}