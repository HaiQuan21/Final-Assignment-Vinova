import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { getAllArticles } from "../api/apiArticle";
import type { Article } from "../../../constants/MainObjectClass";

interface UseGetArticlesParams {
  pagination: PaginationState;
  sorting: SortingState;
  refetchKey?: number;
}

export function useGetArticles({ pagination, sorting, refetchKey = 0 }: UseGetArticlesParams) {
  const [data, setData] = useState<Article[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
 
  useEffect(() => {
    setIsLoading(true);
    getAllArticles({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      search: search || undefined,
      sort: sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
      f_type:"article",
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
        console.log("Data Article trả về",res);
      })
      .finally(() => setIsLoading(false));
  }, [pagination.pageIndex, pagination.pageSize, sorting, search, refetchKey]);

  return { data, totalEntries, isLoading };
}