import axiosInstance from "../../../api/axiosInstance";
import type { CreateStaticContentPayload,UpdateStatiContentPayload } from "./payloadAPIStaticContent";
// ─── Articles ─────────────────────────────────────────────────────────────────
export const getAllStaticContent = () =>
    axiosInstance.get("/static-content");
  export const getStaticContentPDBySlug = (id: string) =>
    axiosInstance.get(`/static-content/${id}`);
  export const createStaticContent = (data: CreateStaticContentPayload) =>
    axiosInstance.post("/static-content", data);
  export const updateStaticContentBySlug = (id: string, data: UpdateStatiContentPayload) =>
    axiosInstance.put(`/static-content/${id}`, data);
  export const deleteStaticContentBySlug = (ids: string[]) =>
    axiosInstance.delete("/static-content", {
      data: { ids },
    });