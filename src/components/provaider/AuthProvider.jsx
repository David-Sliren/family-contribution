"use client";

import { createUserStore } from "@/store/user/userStore";
import { useRouter } from "next/navigation";
import { useRef, useContext, createContext, useState, useEffect } from "react";
import { useStore } from "zustand";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children, initialState }) => {
  const [storeRef] = useState(() => createUserStore(initialState));

  useEffect(() => {
    if (!initialState && storeRef.getState().isAuth) {
      return storeRef.getState().logout();
    }

    if (initialState && !storeRef.getState().isAuth) {
      return storeRef.getState().setUser(initialState);
    }
  }, [initialState, storeRef]);

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
