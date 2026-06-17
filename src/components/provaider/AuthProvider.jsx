"use client";

import { createUserStore } from "@/store/user/userStore";
import { useRef, useContext, createContext, useState, useEffect } from "react";
import { useStore } from "zustand";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children, initialState }) => {
  const [storeRef] = useState(() => createUserStore(initialState));
  const timer = useRef(null);

  useEffect(() => {
    const store = storeRef.getState();

    if (!initialState && store.isAuth) {
      return store.logout();
    }

    if (initialState && !store.isAuth) {
      return store.setUser(initialState);
    }
  }, [initialState, storeRef]);

  useEffect(() => {
    if (!initialState) return;

    const ms = initialState?._exp * 1000 - Date.now();

    if (ms <= 0) return;

    timer.current = setTimeout(() => {
      storeRef.getState().logout();
    }, ms);

    return () => clearTimeout(timer.current);
  }, [initialState, timer, storeRef]);

  return (
    <AuthContext.Provider value={storeRef}>{children}</AuthContext.Provider>
  );
};

export const useUserStore = (selector) => {
  const store = useContext(AuthContext);

  if (!store) {
    const error = new Error("is requered use store on authProvider");
    error.code = "STORE_ERROR";
    throw error;
  }

  return useStore(store, selector);
};
