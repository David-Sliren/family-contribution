import { BottomSheet } from "@/components/ui/BottomSheet/BottomSheet";
import { NavBarTop } from "@/components/ui/nav/navtop/NavBarTop";
import { NavBarBottom } from "@/components/ui/nav/navbottom/NavBarBottom";
import { Cart } from "@/components/ui/cart/Cart";
import { AuthProvider } from "@/components/provaider/AuthProvider";
import { getUserData } from "@/utils/getUserData";
import { excludeForUser } from "@/utils/mongoose-helper/excludeInfoOfDatabase";
import { Notification } from "@/components/ui/notifications/Notification";
import { unstable_noStore as noStore } from "next/cache";
export default async function layout({ children }) {
  noStore();
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
      <Notification />
    </AuthProvider>
  );
}
