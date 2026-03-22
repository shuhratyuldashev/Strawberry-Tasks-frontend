import { tokenStorage } from "@/api/axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as null | { id: string; username: string; email: string },
    isAuthenticated: false,
    loading: false,
  }),
  actions: {
    setUser(user: any) {
      this.user = user;
      this.isAuthenticated = true;
    },
    logOut() {
      tokenStorage.clear();
      window.location.reload();
    },
  },
});