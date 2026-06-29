import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { getAllArticlePD } from "../api/apiArticlePD";
import type { ArticlePD } from "../../../constants/MainObjectClass";

interface UseGetArticlePDParams {
  pagination: PaginationState;
  sorting: SortingState;
  refetchKey?: number;
  type?: "article" | "pd";
}

export function useGetArticlePD({
  pagination,
  sorting,
  refetchKey = 0,
  type,
}: UseGetArticlePDParams) {
  const [data, setData] = useState<ArticlePD[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const fetchArticlePD = () => {
    setIsLoading(true);
    getAllArticlePD({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      search: search || undefined,
      sort:
        sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
      f_type: type,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
        console.log("Data Article trả về", res);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchArticlePD();
  }, [pagination.pageIndex, pagination.pageSize, sorting, search]);

  return { data, totalEntries, isLoading, fetchArticlePD };
}
