import { BottomSheet } from "@/components/ui/BottomSheet/BottomSheet";
import { NavBarTop } from "@/components/ui/nav/navtop/NavBarTop";
import { NavBarBottom } from "@/components/ui/nav/navbottom/NavBarBottom";
import React from "react";
import { Cart } from "@/components/ui/cart/Cart";
import { AuthProvider } from "@/components/provaider/AuthProvider";
import { getUserData } from "@/utils/getUserData";
import { excludeForUser } from "@/utils/excludeInfoOfDatabase";

export default async function layout({ children }) {
  const userData = await getUserData();
  const user = userData ? excludeForUser(userData) : userData;

  return (
    <AuthProvider initialState={user}>
      <header className="sticky top-0 z-50">
        <NavBarTop />
      </header>
      <main className="bg-slate-50 relative">
        {children}
        <NavBarBottom />
      </main>

      <BottomSheet>
        <Cart />
      </BottomSheet>
    </AuthProvider>
  );
}
