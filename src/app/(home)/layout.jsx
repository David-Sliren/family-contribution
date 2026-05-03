import { BottomSheet } from "@/components/ui/BottomSheet/BottomSheet";
import { NavBarTop } from "@/components/ui/nav/NavBarTop";
import { NavBarBottom } from "@/components/ui/nav/NavBarBottom";
import React from "react";
import { Cart } from "@/components/ui/cart/Cart";

export default function layout({ children }) {
  return (
    <>
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
    </>
  );
}
