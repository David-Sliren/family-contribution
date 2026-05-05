"use client";
import { formatMoney } from "@/config/money";
import React from "react";
import clsx from "clsx";
import {
  LuCircleAlert,
  LuClipboardPlus,
  LuCombine,
  LuHeartPulse,
  LuHospital,
  LuPill,
  LuSparkle,
  LuSpeaker,
  LuTriangleAlert,
} from "react-icons/lu";
import { defaultDate } from "@/config/dates";

export const CostCard = ({ name, price, status, lastUpdate, category }) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl editorial-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start gap-5 ">
        <div
          className={clsx(
            "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
            {
              "bg-green-500/10 text-green-600": category === "clinico",
              "bg-blue-500/10 text-blue-600": category === "variable",
            },
          )}
        >
          <span className="text-3xl">
            {category === "variable" ? <LuCombine /> : <LuHeartPulse />}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold font-headline text-on-surface uppercase">
            {name}
          </h3>
          <p className="text-sm font-medium text-on-surface-variant">
            {formatMoney(price)}
          </p>
          <div
            className={clsx(
              "hidden mt-3 lg:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ",
              {
                "bg-blue-500/10 text-blue-600": category === "variable",
                "bg-green-500/10 text-green-600": category === "clinico",
              },
            )}
          >
            <span className="text-sm">
              {category === "clinico" ? <LuHeartPulse /> : <LuCombine />}
            </span>
            {category}
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex flex-col md:items-end justify-center">
          <span className="text-xs font-semibold text-outline uppercase tracking-widest mb-1">
            Fecha
          </span>
          <span className="text-on-surface font-medium">
            {defaultDate(lastUpdate)}
          </span>
        </div>
        <div
          className={clsx(
            "flex justify-center items-center gap-2 lg:hidden px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20 cursor-pointer",
            {
              "bg-green-500/20 border border-green-500/40 hover:bg-green-400/40 text-green-600 disabled:opacity-80":
                category === "clinico",
              "bg-blue-500/20 border border-blue-500/40 hover:bg-blue-500/40 text-blue-600":
                category === "variable",
            },
          )}
        >
          {category === "clinico" ? <LuHeartPulse /> : <LuCombine />}

          {category}
        </div>
      </div>
    </div>
  );
};
