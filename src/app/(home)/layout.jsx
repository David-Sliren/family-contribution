import { BottomSheet } from "@/components/ui/BottomSheet/BottomSheet";
import { NavBarTop } from "@/components/ui/nav/navtop/NavBarTop";
import { NavBarBottom } from "@/components/ui/nav/navbottom/NavBarBottom";
import { Cart } from "@/components/ui/cart/Cart";
import { AuthProvider } from "@/components/provaider/AuthProvider";
import { getSession } from "@/utils/getUserData";
import { Notification } from "@/components/ui/notifications/Notification";

export default async function layout({ children }) {
  const session = await getSession();

  return (
    <AuthProvider initialState={session?.user ?? null}>
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
      <Notification />
    </AuthProvider>
  );
}
