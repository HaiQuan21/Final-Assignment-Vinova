import { useState, useEffect, useCallback } from "react";
import { getDoulaSubscriptionDetail } from "../../api/Doula Subscription/apiDoulaSubscription";
import type { DoulaSubscription } from "../../../../../constants/MainObjectClass";
import { toast } from "react-toastify";

export function useDoulaSubscriptionDetail(doulaId: string) {
  const [data, setData] = useState<DoulaSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoulaSubscriptionDetail = useCallback(() => {
    if (!doulaId) return;
    setIsLoading(true);
    getDoulaSubscriptionDetail(doulaId)
      .then(({ data: res }) => setData(res.data))
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load subscription detail.");
      })
      .finally(() => setIsLoading(false));
  }, [doulaId]);

  useEffect(() => {
    fetchDoulaSubscriptionDetail();
  }, [fetchDoulaSubscriptionDetail]);

  return { data, isLoading, fetchDoulaSubscriptionDetail };
}