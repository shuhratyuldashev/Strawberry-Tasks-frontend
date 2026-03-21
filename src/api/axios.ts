import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_URL as string;

if (!baseURL) {
  console.error("[axios] VITE_API_URL is not defined — requests will fail");
} else {
  console.log("[axios] VITE_API_URL:", baseURL);
}

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

const refreshApi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

const ACCESS_KEY  = "access";
const REFRESH_KEY = "refresh";

export const tokenStorage = {
  getAccess:  () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  setTokens: (access: string, refresh?: string) => {
    localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const access = tokenStorage.getAccess();
  if (access) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) return null;

  const { data } = await refreshApi.post("/token/refresh/", { refresh });
  const nextAccess  = data?.access  ?? data?.accessToken;
  const nextRefresh = data?.refresh ?? data?.refreshToken;

  if (!nextAccess) return null;

  tokenStorage.setTokens(nextAccess, nextRefresh);
  return nextAccess;
}

// ✅ AxiosError — no underscores
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ||= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      const newAccess = await refreshPromise;

      if (!newAccess) {
        tokenStorage.clear();
        window.location.href = "/auth";
        return Promise.reject(error);
      }

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return api(originalRequest);
    } catch (e) {
      tokenStorage.clear();
      window.location.href = "/auth";
      return Promise.reject(e);
    }
  }
);