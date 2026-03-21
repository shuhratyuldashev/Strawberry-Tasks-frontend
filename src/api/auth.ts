import { api, tokenStorage } from "./axios";

let refreshTimer: number | null = null;


export async function checkAuth(): Promise<{ data: any; success: boolean }> {
  const access = tokenStorage.getAccess();
  if (!access) return { data: null, success: false };

  try {
    const response = await api.get("/me/");
    return { data: response.data, success: true };
  } catch {
    return { data: null, success: false };
  }
}

export function startAutoRefresh() {
  stopAutoRefresh();

  refreshTimer = window.setInterval(async () => {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) return;

    try {
      const { data } = await api.post("/token/refresh", { refresh });

      const nextAccess = data?.access ?? data?.accessToken;
      const nextRefresh = data?.refresh ?? data?.refreshToken;

      if (!nextAccess) throw new Error("No access token returned");

      tokenStorage.setTokens(nextAccess, nextRefresh);
    } catch {
      stopAutoRefresh();
      tokenStorage.clear();
      window.location.href = "/auth";
    }
  }, 30 * 60 * 1000);
}

export function stopAutoRefresh() {
  if (refreshTimer !== null) {
    window.clearInterval(refreshTimer);
    refreshTimer = null;
  }
}