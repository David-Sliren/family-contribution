"use client";
import { formatMoney } from "@/config/money";
import clsx from "clsx";
import {
  LuCar,
  LuClipboardPlus,
  LuHeartPulse,
  LuPackage,
  LuPill,
  LuUsers,
  LuWheat,
} from "react-icons/lu";
import { defaultDate } from "@/config/dates";

const CATEGORY_STYLE = {
  transporte: { icon: LuCar, classes: "bg-sky-500/10 text-sky-600" },
  medicina: { icon: LuPill, classes: "bg-rose-500/10 text-rose-500" },
  suplemento: { icon: LuWheat, classes: "bg-amber-500/10 text-amber-600" },
  clinico: { icon: LuHeartPulse, classes: "bg-green-500/10 text-green-600" },
  suministro: { icon: LuPackage, classes: "bg-orange-500/10 text-orange-600" },
  cuidador: { icon: LuUsers, classes: "bg-indigo-500/10 text-indigo-500" },
};

const FALLBACK_STYLE = {
  icon: LuClipboardPlus,
  classes: "bg-surface-container-high text-on-surface-variant",
};

export const ExpenseCard = ({ name, price, lastUpdate, category }) => {
  const style = CATEGORY_STYLE[category] ?? FALLBACK_STYLE;
  const Icon = style.icon;

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl editorial-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start gap-5 ">
        <div
          className={clsx(
            "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
            style.classes,
          )}
        >
          <span className="text-3xl">
            <Icon />
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
              "hidden mt-3 lg:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase",
              style.classes,
            )}
          >
            <span className="text-sm">
              <Icon />
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
            "flex justify-center items-center gap-2 lg:hidden px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20",
            style.classes,
          )}
        >
          <Icon />
          {category}
        </div>
      </div>
    </div>
  );
};