import axiosInstance from "./axiosInstance";
import {
  type LoginPayload,
  type RefreshTokenPayload,
  type CreateArticlePayload,
  type UpdateArticlePayload,
  type VoucherPayload,
  type GetVouchersParams,
  type GetArticlesParams,
  type GetCategoriesParams,
} from "../constants/payloadAPI";
import { type LoginResponse } from "../constants/responseAPI";

// ─── Auth ────────────────────────────────────────────────────────────────────
export const postLogin = (data: LoginPayload) =>
  axiosInstance.post<LoginResponse>("/auth/login", data);
export const refreshToken = (data: RefreshTokenPayload) =>
  axiosInstance.post("/auth/refresh-access-token", data);

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
  axiosInstance.put(`/articles/:${id}`, data);
export const deleteMultipleArticles = (ids: string[]) =>
  axiosInstance.delete("/articles", {
    data: { ids },
  });

// ─── Vouchers ───────────────────────────────────────────────────────────────────

export const getVouchers = (params?: GetVouchersParams) =>
   axiosInstance.get("/vouchers",{params});
export const getVouchersByCode = (code: string) =>
  axiosInstance.get(`/vouchers/by-code/:${code}`);
export const getVouchersById = (id: string) =>
  axiosInstance.get(`/vouchers/:${id}`);
export const createVoucher = (data: VoucherPayload) =>
  axiosInstance.post("/vouchers", data);

// ─── Catgories ───────────────────────────────────────────────────────────────────
export const getAllCategories =  (params?: GetCategoriesParams) =>
  axiosInstance.get("/categories",{params});

// ─── Doula Package ───────────────────────────────────────────────────────────────────
export const getDoulaVouchers = () => axiosInstance.get("/doula-vouchers");

// ─── Doula Package ───────────────────────────────────────────────────────────────────
export const getPackageList = () =>
  axiosInstance.get(
    "/doula-packages?f_doulaId=0300bc8f-2d85-4dda-92fe-cc522647789d&page=1&limit=25",
  );
export const getPackageDetails = (id: string) =>
  axiosInstance.get(`/doula-packages/:${id}`);
