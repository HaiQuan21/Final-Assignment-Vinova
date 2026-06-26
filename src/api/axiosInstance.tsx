import axios from "axios";
import { refreshToken as refreshTokenApi } from "./apiService";

const axiosInstance = axios.create({
  baseURL: "https://selling-held-verbal-gerald.trycloudflare.com/api/v1/admins",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Tự gắn access token vào mọi request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Tự refresh token khi gặp 401
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const rt = localStorage.getItem("refreshToken");
        const { data } = await refreshTokenApi({ refreshToken: rt! });
        localStorage.setItem("accessToken", data.tokens["accessToken"]);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
