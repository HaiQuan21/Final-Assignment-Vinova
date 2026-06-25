import axiosInstance from "../../../api/axiosInstance";
import { type GetVouchersParams } from "./payloadAPIVoucher";
import { type VoucherPayload } from "./payloadAPIVoucher";
// ─── Vouchers ───────────────────────────────────────────────────────────────────

export const getVouchers = (params?: GetVouchersParams) =>
    axiosInstance.get("/vouchers",{params});
 export const getVouchersByCode = (code: string) =>
   axiosInstance.get(`/vouchers/by-code/:${code}`);
 export const getVouchersById = (id: string) =>
   axiosInstance.get(`/vouchers/:${id}`);
 export const createVoucher = (data: VoucherPayload) =>
   axiosInstance.post("/vouchers", data);