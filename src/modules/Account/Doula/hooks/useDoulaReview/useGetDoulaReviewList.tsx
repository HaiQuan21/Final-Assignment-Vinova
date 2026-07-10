import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListDoulasReview } from "../../api/Doula Reviews/apiDoulaReview";
import type { DoulaReview } from "../../../../../constants/MainObjectClass";

export function useGetDoulaReviewList(doulaId: string) {
  const [data, setData] = useState<DoulaReview[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 25);
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const fetchDoulaReviewList = useCallback(() => {
    if (!doulaId) return;
    setIsLoading(true);
    getListDoulasReview({
      f_doulaId: doulaId,
      page,
      limit,
      offset: (page - 1) * limit,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
        console.log("Data Doula Review List",res)
      })
      .finally(() => setIsLoading(false));
  }, [doulaId, page, limit, search, sort]);

  useEffect(() => {
    fetchDoulaReviewList();
  }, [fetchDoulaReviewList]);

  return { data, totalEntries, isLoading, fetchDoulaReviewList };
}