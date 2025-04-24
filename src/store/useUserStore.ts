import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  password: string;
  avatar?: {
    id: string;
    url: string;
  };
  verified: boolean;
  lastLogin: Date;
  lastPasswordReset: Date;
  googleRegistered: boolean;
  prefernces?: {
    selfDescription: string;
    work: string[];
    country: string;
    toolStack: string[];
    goals: string[];
  };
};

type UserStore = {
  user: User | null;
  setUser: (user: User | undefined) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage", // unique key in storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
