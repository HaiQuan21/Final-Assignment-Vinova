import axiosInstance from "../../../../../api/axiosInstance";
import { type GetListOfDoulasPackageParams, } from "../Doula Package/payloadAPIDoulaPackage";
// ─── Articles ─────────────────────────────────────────────────────────────────
export const getPackageList = (params?: GetListOfDoulasPackageParams) =>
    axiosInstance.get("/doula-packages",{params});
  export const getPackageDetail = (id: string) =>
    axiosInstance.get(`/doula-packages/${id}`);
