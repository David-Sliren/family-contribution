"use client";

import { authClient } from "@/utils/auth-client";
import { useContext, createContext } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children, initialState }) => {
  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export const useUserStore = (selector) => {
  const store = useContext(AuthContext);

  const { data: session, isPending } = authClient.useSession();
  const signOut = async () => {
    await authClient.signOut();
  };

  const user = isPending ? store : (session?.user ?? null);
  return { user, isAuth: !!user, isPending, logout: signOut };
};
