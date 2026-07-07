import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { getListClient } from "../api/apiClient";
import type { Client } from "../../../../constants/MainObjectClass";

interface UseGetListClientParams {
  pagination: PaginationState;
  sorting: SortingState;
}

export function useGetListClient({ pagination, sorting }: UseGetListClientParams) {
  const [data, setData] = useState<Client[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const fetchListClient = useCallback(() => {
    setIsLoading(true);
    getListClient({
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
    fetchListClient();
  }, [fetchListClient]);

  return { data, totalEntries, isLoading, fetchListClient };
}