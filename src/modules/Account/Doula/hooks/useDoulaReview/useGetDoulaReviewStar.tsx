import { useState,useEffect,useCallback } from "react";
import { getDoulaReviewStar } from "../../api/Doula Reviews/apiDoulaReview";
import type { DoulaReviewStar } from "../../../../../constants/MainObjectClass";
import { toast } from "react-toastify";

export function useGetDoulaReviewStar(doulaId: string) {
  const [data, setData] = useState<DoulaReviewStar | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviewStar = useCallback(() => {
    if (!doulaId) return;
    setIsLoading(true);
    getDoulaReviewStar(doulaId)
      .then(({ data: res }) => setData(res.data))
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load review stats.");
      })
      .finally(() => setIsLoading(false));
  }, [doulaId]);

  useEffect(() => {
    fetchReviewStar();
  }, [fetchReviewStar]);

  return { data, isLoading, fetchReviewStar };
}