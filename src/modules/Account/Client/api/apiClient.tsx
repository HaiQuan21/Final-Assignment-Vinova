import axiosInstance from "../../../../api/axiosInstance";
import type { GetListClientParams,EditClientByIdPayload } from "./payloadAPIClient";
// ─── Articles ─────────────────────────────────────────────────────────────────
export const getListClient = (params?: GetListClientParams) =>
    axiosInstance.get("/users",{params});
  export const getUserById = (id: string) =>
    axiosInstance.get(`/users/${id}`);
  export const editUserById = (id: string, data: EditClientByIdPayload) =>
    axiosInstance.put(`/users/${id}`, data);
  export const deleteUserById = (id: string) =>
    axiosInstance.delete(`/users/${id}`);