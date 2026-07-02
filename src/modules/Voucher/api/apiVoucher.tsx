import axiosInstance from "../../../api/axiosInstance";
import { type GetVouchersParams, type VoucherPayload, type ListDoulaVoucherParams, type PatchCareStatusPayload } from "./payloadAPIVoucher";
// ─── Vouchers ───────────────────────────────────────────────────────────────────

export const getVouchers = (params?: GetVouchersParams) =>
    axiosInstance.get("/vouchers",{params});
 export const getVouchersByCode = (code: string) =>
   axiosInstance.get(`/vouchers/by-code/${code}`);
 export const getVouchersById = (id: string) =>
   axiosInstance.get(`/vouchers/${id}`);
 export const createVoucher = (data: VoucherPayload) =>
   axiosInstance.post("/vouchers", data);
 export const getListDoulaVoucher = (params : ListDoulaVoucherParams) =>
  axiosInstance.get("/doula-vouchers",{params});
 export const patchCareStatus = (id: string, data: PatchCareStatusPayload) =>
  axiosInstance.put(`/vouchers/${id}`,data);