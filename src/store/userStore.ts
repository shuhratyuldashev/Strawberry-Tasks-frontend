import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as null | { id: string; name: string; email: string },
    isAuthenticated: false,
    loading: false,
  }),
  actions: {
    setUser(user: any) {
      this.user = user;
      this.isAuthenticated = true;
    },
    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});