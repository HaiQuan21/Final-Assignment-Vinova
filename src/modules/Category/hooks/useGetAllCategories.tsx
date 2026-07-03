import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { getAllCategories } from "../api/apiCategory";
import type { Category } from "../../../constants/MainObjectClass";

interface UseGetAllCategoriesParams {
  pagination: PaginationState;
  sorting: SortingState;
  refetchKey?: number;
}

export function useGetAllCategories({ pagination, sorting, refetchKey = 0 }: UseGetAllCategoriesParams) {
  const [data, setData] = useState<Category[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const fetchAllCategories = useCallback(() => {
    setIsLoading(true);
    getAllCategories({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      search: search || undefined,
      sort: sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
        console.log("Toàn bộ Categories trả về",res);
      })
      .finally(() => setIsLoading(false));
  }, [pagination.pageIndex, pagination.pageSize, sorting, search]);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories, refetchKey]);

  return { data, totalEntries, isLoading, fetchAllCategories };
}