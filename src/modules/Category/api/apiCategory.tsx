import axiosInstance from "../../../api/axiosInstance";
import type { GetCategoriesParams,CreateCategoriesPayload,UpdateCategoriesPayload } from "./payloadAPICategories";
// ─── Articles ─────────────────────────────────────────────────────────────────
export const getAllCategories = (params?: GetCategoriesParams) =>
    axiosInstance.get("/categories",{params});
  export const getCategories = (id: string) =>
    axiosInstance.get(`/categories/${id}`);
  export const createCategories = (data: CreateCategoriesPayload) =>
    axiosInstance.post("/categories", data);
  export const updateCategories = (id: string, data: UpdateCategoriesPayload) =>
    axiosInstance.put(`/categories/${id}`, data);
  export const deleteCategories = (ids: string[]) =>
    axiosInstance.delete("/categories", {
        data: { ids },
      });