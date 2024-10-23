import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStore } from "./type-auth/type";

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          userId: null,
          accessToken: null,
        }),
      userId: null,
      setUserId: (userId: string) => set({ userId: userId }),
      accessToken: null,
      setAccessToken: (accessToken: string) =>
        set({ accessToken: accessToken }),
    }),
    {
      name: "userInfoStorage", //Storage 이름 지정 (default: localStorage)
    },
  ),
  //)
);
