"use client";

import { useUserStore } from "@/components/provaider/AuthProvider";
import { formatMoney } from "@/config/money";
import clsx from "clsx";
import React from "react";
import {
  LuCalendarDays,
  LuChartColumnIncreasing,
  LuHandHeart,
} from "react-icons/lu";

const styleVariants = {
  heiglihg: "bg-primary-container text-white",
  default: "bg-surface-container-lowest text-on-surface",
};

const Stat = ({ icon: Icon, label, more, variants }) => {
  return (
    <div
      className={clsx(
        " p-8 rounded-[2rem] flex flex-col justify-between min-h-[200px] border border-outline-variant/10 animate-slide-in-right timeline-view animate-range-flash-entry",
        styleVariants[variants] || styleVariants.default,
      )}
    >
      <span className="text-primary-container text-3xl mb-4">{Icon}</span>
      <div>
        <h3 className=" font-medium text-sm uppercase tracking-wider mb-1">
          {label}
        </h3>
        <p className=" text-3xl font-extrabold capitalize">{more}</p>
      </div>
    </div>
  );
};

export const Impact = () => {
  const user = useUserStore((state) => state.user);

  const stats = [
    {
      icon: <LuHandHeart />,
      label: "Total Contribuido",
      more: formatMoney(user?.totalContributed),
      variants: "",
    },
    {
      icon: <LuChartColumnIncreasing />,
      label: "Número de Aportes",
      more: user?.contributions.length,
      variants: "",
    },
    {
      icon: <LuCalendarDays className="text-white" />,
      label: "Mes más Activo",
      more: user?.monthMoreActive || "",
      variants: "heiglihg",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-slide-in-bottom">
      {stats.map((item) => (
        <Stat
          key={item.label}
          label={item.label}
          more={item.more}
          icon={item.icon}
          variants={item.variants}
        />
      ))}
    </section>
  );
};
