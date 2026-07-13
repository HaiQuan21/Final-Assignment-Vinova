import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllAdmin } from "../api/apiAdmin";
import type { AdminItem } from "../../../../constants/MainObjectClass";

export function useGetAllAdmin() {
  const [data, setData] = useState<AdminItem[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 25);
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const fetchAllAdmin = useCallback(() => {
    setIsLoading(true);
    getAllAdmin({
      page,
      limit,
      offset: (page - 1) * limit,
      search: search ,
      sort: sort,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
      })
      .finally(() => setIsLoading(false));
  }, [page, limit, search, sort]);

  useEffect(() => {
    fetchAllAdmin();
  }, [fetchAllAdmin]);

  return { data, totalEntries, isLoading, fetchAllAdmin };
}