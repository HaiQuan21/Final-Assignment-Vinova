import axiosInstance from "../../../api/axiosInstance";
import { type GetArticlesPDParams, type CreateArticlePDPayload,type UpdateArticlePDPayload } from "./payloadAPIArticlePD";
// ─── Articles ─────────────────────────────────────────────────────────────────
export const getAllArticlePD = (params?: GetArticlesPDParams) =>
    axiosInstance.get("/articles",{params});
  export const getArticlePDById = (id: string) =>
    axiosInstance.get(`/articles/${id}`);
  export const createArticlePD = (data: CreateArticlePDPayload) =>
    axiosInstance.post("/articles", data);
  export const updateArticlePD = (id: string, data: UpdateArticlePDPayload) =>
    axiosInstance.put(`/articles/${id}`, data);
  export const deleteMultipleArticlePD = (ids: string[]) =>
    axiosInstance.delete("/articles", {
      data: { ids },
    });