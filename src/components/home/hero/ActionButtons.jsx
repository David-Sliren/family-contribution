"use client";
import { useUserStore } from "@/components/provaider/AuthProvider";
import Link from "next/link";
import React from "react";

export const ActionButtons = () => {
  const isAuth = useUserStore((state) => state.isAuth);
  return (
    <article className="flex flex-wrap gap-4 pt-4">
      <button
        disabled={true}
        className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-lg tonal-shadow-sm hover:scale-[1.02] transition-all active:scale-[0.98] cursor-pointer animate-fade-in-up disabled:opacity-60"
      >
        Hacer una Colaboración
      </button>
      <Link
        href={isAuth ? "/medicine" : "/auth/login"}
        className="px-8 py-4 bg-surface-container-highest text-on-secondary-container rounded-full font-bold text-lg hover:bg-violet-200
      active:scale-[0.98] transition-all cursor-pointer animate-fade-in-up"
      >
        Ver medicamentos
      </Link>
    </article>
  );
};
