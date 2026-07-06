import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { getListOfDoulas } from "../api/apiDoula";
import type { Doula } from "../../../../constants/MainObjectClass";

interface UseGetListOfDoulaParams {
  pagination: PaginationState;
  sorting: SortingState;
}

export function useGetListOfDoula({ pagination, sorting }: UseGetListOfDoulaParams) {
  const [data, setData] = useState<Doula[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const fetchListOfDoulas = useCallback(() => {
    setIsLoading(true);
    getListOfDoulas({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      search: search || undefined,
      sort: sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
        console.log("Data List of Doula",res);
      })
      .finally(() => setIsLoading(false));
  }, [pagination.pageIndex, pagination.pageSize, sorting, search]);

  useEffect(() => {
    fetchListOfDoulas();
  }, [fetchListOfDoulas]);

  return { data, totalEntries, isLoading, fetchListOfDoulas };
}