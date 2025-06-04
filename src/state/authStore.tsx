
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from "./storage";

interface AuthStoreProps {
    user: Record<string, any> | null;
    setUser: (user: any) => void;
    setCurrentOrder: (order: any) => void;
    currentOrder: Record<string, any> | null;
    logOut: () => void;

}

export const userAuthStore = create<AuthStoreProps>()(

    persist(
        (set,) => ({
            user: null,
            currentOrder: null,
            setUser: (data) => { set({ user: data }) },
            setCurrentOrder: (order) => { set({ currentOrder: order }) },
            logOut: () => { set({ user: null, currentOrder: null }); },
        }),

        {
            name: 'auth-storage',
            storage: createJSONStorage(() => mmkvStorage), // use MMKV storage
        }
    )
)

