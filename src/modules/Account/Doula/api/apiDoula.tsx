import axiosInstance from "../../../../api/axiosInstance";
import { type GetListOfDoulasParams,type UpdateDoulaPayload } from "./payloadAPIDoula";
// ─── Articles ─────────────────────────────────────────────────────────────────
export const getListOfDoulas = (params?: GetListOfDoulasParams) =>
    axiosInstance.get("/doulas",{params});
  export const getDoulaDetailById = (id: string) =>
    axiosInstance.get(`/doulas/${id}`);
  export const updateDoulaById = (id: string, data: UpdateDoulaPayload) =>
    axiosInstance.put(`/doulas/${id}`, data);
  export const deleteDoulaById = (id) =>
    axiosInstance.delete(`/doulas/${id}`,);