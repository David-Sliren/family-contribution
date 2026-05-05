"use client";

import { useMedicineStorage } from "@/store/medicineStore";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuBell, LuCirclePlus, LuShoppingCart } from "react-icons/lu";

const navBarRoutes = [
  {
    label: "Principal",
    href: "/",
  },
  {
    label: "Medicinas",
    href: "/medicine",
  },

  {
    label: "Costos adicionales",
    href: "/additional-costs",
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
  const { setIsOpenCart, products } = useMedicineStorage();
  return (
    <nav className="bg-slate-50 backdrop-blur-xl border-b border-gray-500/80 xl:border-gray-600/30">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-[#6e36d2] dark:text-[#9966FF]">
            Aleida | Contribucion
          </span>
          <div className="hidden md:flex items-center gap-6">
            {navBarRoutes.map((item) => (
              <LinkRoute key={item.label} label={item.label} href={item.href} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full font-medium text-sm hover:opacity-90 transition-all active:scale-95">
            <LuCirclePlus className="text-2xl" />
            Agregar Miembro
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={setIsOpenCart}
              className="relative p-2 text-on-surface-variant hover:bg-slate-100/50 rounded-full transition-all duration-300 xl:hidden cursor-pointer"
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
          <Image
            alt="User profile avatar"
            className="w-9 h-9 rounded-full object-cover cursor-pointer"
            src="/family-img/Default.png"
            height={500}
            width={500}
          />
        </div>
      </div>
    </nav>
  );
};
