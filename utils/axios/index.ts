import axios, { InternalAxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? ""
      : "http://localhost:6969",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== undefined) {
      const { _token } = parseCookies();
      config.headers.Authorization = "Bearer" + _token;
    }
    return config;
  }
);

export default axios;
