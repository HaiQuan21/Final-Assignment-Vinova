import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListOfDoulas } from "../../api/Doula/apiDoula";
import type { Doula } from "../../../../../constants/MainObjectClass";

export function useGetListOfDoula() {
  const [data, setData] = useState<Doula[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 25);
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const fetchListOfDoulas = useCallback(() => {
    setIsLoading(true);
    getListOfDoulas({
      page,
      limit,
      offset: (page - 1) * limit,
      search: search || undefined,
      sort: sort || undefined,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
        console.log("Data List of Doula",res);
      })
      .finally(() => setIsLoading(false));
  }, [page, limit, search, sort]);

  useEffect(() => {
    fetchListOfDoulas();
  }, [fetchListOfDoulas]);

  return { data, totalEntries, isLoading, fetchListOfDoulas };
}