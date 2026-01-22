import { create } from "zustand";
import { User } from "@/types/user";

interface AuthStore {
    user: User | null,
    isAuthenticated: boolean,
    setUser: (user: User) => void,
    clearIsAuthenticated: () => void,
}

export const authStore = create<AuthStore>()(
    (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user) => set(() => ({ user: user, isAuthenticated: true })),
        clearIsAuthenticated: () => set(() => ({isAuthenticated: false, user: null})),
    })
);