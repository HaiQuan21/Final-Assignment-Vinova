import axiosInstance from "../../../../../api/axiosInstance";
import { type GetListDoulaReviewParams,type UpdateReviewByIdPayload } from "./payloadAPIDoulaReview";
// ─── Articles ─────────────────────────────────────────────────────────────────
export const getListDoulasReview = (params?: GetListDoulaReviewParams) =>
    axiosInstance.get("/reviews",{params});
export const getDoulaReviewStar = (doulaId: string) =>
  axiosInstance.get(`/reviews/overview`, { params: { doulaId } });
  export const getReviewDetail = (id: string) =>
    axiosInstance.get(`/reviews/${id}`);
  export const updateReviewById = (id: string, data: UpdateReviewByIdPayload) =>
    axiosInstance.put(`/reviews/${id}`, data);
  export const deleteReviewById = (id : string) =>
    axiosInstance.delete(`/reviews/${id}`,);