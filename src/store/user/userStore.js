import { createStore } from "zustand";

export const createUserStore = (initialstate) => {
  return createStore((set) => ({
    user: initialstate || null,
    isAuth: !!initialstate,

    // methods
    setUser: (data) => set({ user: data, isAuth: true }),
    logout: () => set({ user: null, isAuth: false }),
  }));
};
