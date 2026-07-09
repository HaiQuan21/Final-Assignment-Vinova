import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListClient } from "../api/apiClient";
import type { Client } from "../../../../constants/MainObjectClass";

export function useGetListClient() {
  const [data, setData] = useState<Client[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 25);
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const fetchListClient = useCallback(() => {
    setIsLoading(true);
    getListClient({
      page,
      limit,
      offset: (page - 1) * limit,
      search: search || undefined,
      sort: sort || undefined,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
        console.log("Data list of Client",res)
      })
      .finally(() => setIsLoading(false));
  }, [page, limit, search, sort]); // ← chỉ primitive, stable

  useEffect(() => {
    fetchListClient();
  }, [fetchListClient]);

  return { data, totalEntries, isLoading, fetchListClient };
}