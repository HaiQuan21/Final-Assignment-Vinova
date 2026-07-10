import axiosInstance from "../../../../../api/axiosInstance";
// ─── Articles ─────────────────────────────────────────────────────────────────
  export const getDoulaSubscriptionDetail = (id: string) =>
    axiosInstance.get(`/doula-subscriptions/${id}`);
