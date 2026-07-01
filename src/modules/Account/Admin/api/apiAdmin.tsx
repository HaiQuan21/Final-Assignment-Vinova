import axiosInstance from "../../../../api/axiosInstance";
import type { CreateAdminPayload, GetAllAdminParams,UpdateAdminByIdPayload } from "./payloadAPIAdmin";
// ─── Articles ─────────────────────────────────────────────────────────────────
export const getAllAdmin = (params?: GetAllAdminParams) =>
    axiosInstance.get("/admins",{params});
  export const getAdminById = (id: string) =>
    axiosInstance.get(`/admins/${id}`);
  export const createAdmin = (data: CreateAdminPayload) =>
    axiosInstance.post("/admins", data);
  export const updateAdminById = (id: string, data: UpdateAdminByIdPayload) =>
    axiosInstance.put(`/admins/${id}`, data);
  export const deleteAdminById = (id: string) =>
    axiosInstance.delete(`/admins/${id}`);