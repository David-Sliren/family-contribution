import { create } from "zustand";

export const useNotification = create((set, get) => ({
  notification: null,

  setNotification: ({ message, type = "default", time = 4400 }) => {
    const id = Math.random().toString(36).substring(2);

    set({
      notification: { id, message, type },
    });

    setTimeout(() => {
      if (get().notification.id === id) {
        get().clearNotification();
      }
    }, time);
  },
  clearNotification: () => set({ notification: null }),
}));
