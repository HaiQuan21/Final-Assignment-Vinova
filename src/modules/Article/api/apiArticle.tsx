import axiosInstance from "../../../api/axiosInstance";
import { type GetArticlesParams, type CreateArticlePayload,type UpdateArticlePayload } from "./payloadAPIArticle";
// ─── Articles ─────────────────────────────────────────────────────────────────
export const getAllArticles = (params?: GetArticlesParams) =>
    axiosInstance.get("/articles",{params});
  export const getArticlesById = (id: string) =>
    axiosInstance.get(`/articles/:${id}`);
  export const getArticlesBySlug = () =>
    axiosInstance.get("/articles/by-slug/nick-9999");
  export const createArticles = (data: CreateArticlePayload) =>
    axiosInstance.post("/articles", data);
  export const updateArticle = (id: string, data: UpdateArticlePayload) =>
    axiosInstance.put(`/articles/${id}`, data);
  export const deleteMultipleArticles = (ids: string[]) =>
    axiosInstance.delete("/articles", {
      data: { ids },
    });