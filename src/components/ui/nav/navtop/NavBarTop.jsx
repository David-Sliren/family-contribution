"use client";

import { useMedicineStorage } from "@/store/medicineStore";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuBell, LuShoppingCart } from "react-icons/lu";
import { UserMenu } from "./UserMenu";
import { useUserStore } from "@/components/provaider/AuthProvider";

const navBarRoutes = [
  {
    label: "Principal",
    href: "/",
    auth: true,
  },
  {
    label: "Medicinas",
    href: "/medicine",
    auth: true,
  },

  {
    label: "Costos adicionales",
    href: "/additional-costs",
    auth: true,
  },
];

const LinkRoute = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx("text-gray-500 font-semibold  pb-1 font-body text-sm", {
        "border-b-2 border-primary text-primary": href === pathname,
      })}
    >
      {label}
    </Link>
  );
};

export const NavBarTop = () => {
  const isAuth = useUserStore((state) => state.isAuth);

  const filterNavRoutes = navBarRoutes.filter((nbt) => !nbt.auth || isAuth);

  const { setIsOpenCart, products } = useMedicineStorage();
  return (
    <nav className="bg-slate-50 backdrop-blur-xl border-b border-gray-500/80 xl:border-gray-600/30">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className=" text-lg md:text-xl font-bold tracking-tight text-[#6e36d2] dark:text-[#9966FF]"
          >
            Aleida | Contribucion
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {filterNavRoutes.map((item) => (
              <LinkRoute key={item.href} label={item.label} href={item.href} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={setIsOpenCart}
              className="hidden relative p-2 text-on-surface-variant hover:bg-slate-100/50 rounded-full transition-all duration-300 xl:hidden cursor-pointer"
            >
              <LuShoppingCart className="text-xl" />
              <span className="absolute -top-1 left-4 size-2 p-3 flex justify-center items-center rounded-full text-[10px] text-primary font-semibold">
                {products.length === 0
                  ? ""
                  : `+${Math.min(99, products.length)}`}
              </span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-slate-100/50 rounded-full transition-all duration-300 cursor-pointer hidden">
              <LuBell className="text-xl" />
            </button>
          </div>

          {isAuth ? (
            <UserMenu />
          ) : (
            <Link
              href="/auth/login"
              className="items-center shrink-0 gap-2 px-4 py-2 transition-all active:scale-95 border border-primary/80 cursor-pointer rounded-full text-primary-container text-lg font-semibold text-sm hover:opacity-90 animate-fade-in-down"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// ${isHydrated ? "animate-fade-in-down" : "opacity-0"}
