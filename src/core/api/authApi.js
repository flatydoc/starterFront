import axios from "axios";
import { config } from "../configs/config";

export const authApi = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

authApi.interceptors.request.use((config) => {
  const data = JSON.parse(localStorage.getItem("userData"));
  config.headers.Authorization = `Bearer ${data.accessToken}`;
  return config;
});

authApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const res = await authApi.get("/user/refresh");
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        return authApi.request(originalRequest);
      } catch (e) {
        console.log(e, "UnauthorizedError");
      }
    }
    throw error;
  }
);
