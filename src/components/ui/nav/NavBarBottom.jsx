"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuHouse, LuPill } from "react-icons/lu";

const navBarRoutes = [
  {
    label: "Principal",
    href: "/",
    icon: <LuHouse className="text-lg" />,
  },
  {
    label: "Medicinas",
    href: "/medicine",
    icon: <LuPill className="text-lg" />,
  },
];

const LinkRoute = ({ href, label, icon: Icon }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={clsx("text-gray-500 font-semibold  pb-1 font-body text-sm", {
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
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-slate-50/20 backdrop-blur-2xl rounded-t-3xl shadow-[0px_-8px_24px_rgba(110,54,210,0.04)] border-t border-gray-500 md:hidden z-20">
      <div className="flex justify-around items-center px-4 py-2">
        {navBarRoutes.map((item) => (
          <LinkRoute key={item.label} {...item} />
        ))}
      </div>
    </nav>
  );
};
