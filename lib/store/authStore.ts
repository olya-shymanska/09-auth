import { create } from "zustand";
import { User } from "@/types/user";

interface AuthStore {
    user: User | null,
    isAuthenticated: boolean,
    checkingSession: boolean;
    setUser: (user: User) => void,
    clearIsAuthenticated: () => void,
    setCheckingSession: (value: boolean) => void;
}

export const authStore = create<AuthStore>()(
    (set) => ({
        user: null,
        isAuthenticated: false,
        checkingSession: true,
        setUser: (user) => set(() => ({ user: user, isAuthenticated: true })),
        clearIsAuthenticated: () => set(() => ({ isAuthenticated: false, user: null })),
        setCheckingSession: (value) => set({ checkingSession: value }),
    })
);