import axiosInstance from "./axiosInstance";

// ─── Auth ────────────────────────────────────────────────────────────────────
export interface LoginPayload {
  username: string;
  password: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export const postLogin = (data: LoginPayload) =>
  axiosInstance.post("/auth/login", data);
export const refreshToken = (data: RefreshTokenPayload) =>
  axiosInstance.post("/auth/refresh-access-token", data);

// ─── Articles ─────────────────────────────────────────────────────────────────
export interface ArticlePayload {
    title: string,
    content: string,
    picture: string,
    status: string,
    type: string,
    timeToRead: number, 
    categoryId: string,
    author: string
}

export interface ArticleIndexPayload {
  id : string,
  index: string
}

export interface ArticleNoAuthorPayload {
  title: string,
  content: string,
  picture: string,
  status: string,
  type: string,
  timeToRead: number, 
  categoryId: string,
}
export const getAllArticles = () =>
  axiosInstance.get("/articles?page=1&limit=2&sort=");
export const getArticlesById = (id:string ) => axiosInstance.get(`/articles/:${id}`);
export const getArticlesBySlug = () =>
  axiosInstance.get("/articles/by-slug/nick-9999");
export const createArticles = (data : ArticlePayload) => axiosInstance.post("/articles", data);
export const editArticlesIndex = (index : string, data : ArticleIndexPayload) =>
  axiosInstance.put(`/articles/${index}`, data);
export const updateArticle = (id : string, data : ArticleNoAuthorPayload) =>
  axiosInstance.put(`/articles/:${id}`, data);
export const deleteMultipleArticles = (ids: string[]) =>
  axiosInstance.delete("/articles", {
    data: { ids },
  });

// ─── Vouchers ───────────────────────────────────────────────────────────────────
export interface VoucherPayload {
  code: string,
  description: string,
  startDate: string,
  endDate: string,
  status: string,
  type: string,
  amount: number,
  quantityUse: number,
  minPayAmount: number,
  maxDiscountAmount: number
}

export interface VoucherNoQuantityPayload {
  code: string,
  description: string,
  startDate: string,
  endDate: string,
  status: string,
  type: string,
  amount: number,
  minPayAmount: number,
  maxDiscountAmount: number
}
export const getVouchers = () => axiosInstance.get("/vouchers");
export const getVouchersByCode = (code : string) =>
  axiosInstance.get(`/vouchers/by-code/:${code}`);
export const getVouchersById = (id : string) => axiosInstance.get(`/vouchers/:${id}`);
export const createVoucher = (data : VoucherPayload) => axiosInstance.post("/vouchers", data);
export const patchCareStatus = (id : string, data : VoucherNoQuantityPayload) =>
  axiosInstance.put(`/vouchers/:${id}`, data);

// ─── Doula Package ───────────────────────────────────────────────────────────────────
export const getDoulaVouchers = () => axiosInstance.get("/doula-vouchers");

// ─── Doula Package ───────────────────────────────────────────────────────────────────
export const getPackageList = () => axiosInstance.get("/doula-packages?f_doulaId=0300bc8f-2d85-4dda-92fe-cc522647789d&page=1&limit=25")
export const getPackageDetails = (id : string) => axiosInstance.get(`/doula-packages/:${id}`)