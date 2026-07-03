import axiosInstance from "./axiosInstance";
import {
  type LoginPayload,
  type RefreshTokenPayload,
} from "../constants/payloadAPI";
import { type LoginResponse } from "../constants/responseAPI";

// ─── Auth ────────────────────────────────────────────────────────────────────
export const postLogin = (data: LoginPayload) =>
  axiosInstance.post<LoginResponse>("/auth/login", data);
export const refreshToken = (data: RefreshTokenPayload) =>
  axiosInstance.post("/auth/refresh-access-token", data);

// ─── Doula Package ───────────────────────────────────────────────────────────────────
export const getPackageList = () =>
  axiosInstance.get(
    "/doula-packages?f_doulaId=0300bc8f-2d85-4dda-92fe-cc522647789d&page=1&limit=25",
  );
export const getPackageDetails = (id: string) =>
  axiosInstance.get(`/doula-packages/:${id}`);
