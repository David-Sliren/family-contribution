"use client";

import { useUserStore } from "@/components/provaider/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuBoxes, LuHandCoins, LuHouse } from "react-icons/lu";
import { GlassDefault } from "../../glass/GlassDefault";
import { cn } from "@/utils/cn";

const navBarRoutes = [
  {
    label: "Principal",
    href: "/",
    icon: <LuHouse className="text-lg" />,
    auth: false,
  },
  {
    label: "Inventario",
    href: "/inventory",
    icon: <LuBoxes className="text-lg" />,
    auth: true,
  },
  {
    label: "Gastos",
    href: "/expenses",
    icon: <LuHandCoins className="text-lg" />,
    auth: true,
  },
];

const LinkRoute = ({ href, label, icon: Icon }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn("text-gray-500 font-semibold  pb-1 font-body text-sm", {
        "border-b-2 border-primary text-primary": href === pathname,
      })}
    >
      <div className="flex flex-col items-center justify-center px-5 py-1.5 hover:text-violet-500">
        {Icon}
        <span className="text-[11px] font-bold tracking-wider font-inter uppercase mt-1">
          {label}
        </span>
      </div>
    </Link>
  );
};

export const NavBarBottom = () => {
  const user = useUserStore((state) => state.user);

  return (
    <nav
      className={cn(
        "fixed bottom-5 left-0 w-full flex justify-center md:hidden z-20",
        {
          hidden: !user,
        },
      )}
    >
      <GlassDefault
        classNameWrapper="flex justify-center w-fit rounded-[2em] px-4 shadow-md hover:px-6 hover:py-1 hover:rounded-[2.5em]"
        classNameTint="bg-black/10"
      >
        <div className="flex justify-around items-center px-4 py-2">
          {navBarRoutes.map((item) => (
            <LinkRoute key={item.label} {...item} />
          ))}
        </div>
      </GlassDefault>
    </nav>
  );
};
