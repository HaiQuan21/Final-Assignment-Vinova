import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPackageList } from "../../api/Doula Package/apiDoulaPackage";
import type { DoulaPackage } from "../../../../../constants/MainObjectClass";

export function useGetPackageList(doulaId: string) {
  const [data, setData] = useState<DoulaPackage[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 25);
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const fetchPackageList = useCallback(() => {
    if (!doulaId) return;
    setIsLoading(true);
    getPackageList({
      f_doulaId: doulaId,
      page,
      limit,
      offset: (page - 1) * limit,
      search: search || undefined,
      sort: sort || undefined,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
        console.log("Data Doula Package List",res)
      })
      .finally(() => setIsLoading(false));
  }, [doulaId, page, limit, search, sort]);

  useEffect(() => {
    fetchPackageList();
  }, [fetchPackageList]);

  return { data, totalEntries, isLoading, fetchPackageList };
}