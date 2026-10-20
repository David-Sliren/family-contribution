"use client";
import { formatMoney } from "@/config/money";
import { cn } from "@/utils/cn";
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
import { ItemCard } from "@/components/ui/cards/ItemCard";

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
    <ItemCard
      icon={Icon}
      iconClassName={style.classes}
      title={name}
      meta={formatMoney(price)}
      chip={
        <>
          <span className="text-sm">
            <Icon />
          </span>
          {category}
        </>
      }
      chipClassName={cn("hidden lg:inline-flex", style.classes)}
      dateLabel="Fecha"
      dateValue={defaultDate(lastUpdate)}
      action={
        <div
          className={cn(
            "flex justify-center items-center gap-2 lg:hidden px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20",
            style.classes,
          )}
        >
          <Icon />
          {category}
        </div>
      }
    />
  );
};
