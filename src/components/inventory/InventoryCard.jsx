"use client";
import { formatMoney } from "@/config/money";
import React from "react";
import { cn } from "@/utils/cn";
import {
  LuCircleAlert,
  LuClipboardPlus,
  LuPill,
  LuSparkle,
  LuTriangleAlert,
} from "react-icons/lu";
import { defaultDate } from "@/config/dates";
import { ItemCard } from "@/components/ui/cards/ItemCard";

const STATUS_CHIP = {
  bajo: {
    icon: LuTriangleAlert,
    classes: "bg-yellow-500/20 text-yellow-600",
  },
  agotado: {
    icon: LuCircleAlert,
    classes: "bg-error/10 text-error",
  },
  "en orden": {
    icon: LuSparkle,
    classes: "bg-green-500/10 text-green-600",
  },
};

const STATUS_BUTTON = {
  bajo: "bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/40 text-yellow-600",
  agotado:
    "bg-error/20 border border-error/40 hover:bg-error/40 text-on-error-container",
  "en orden":
    "bg-green-500/20 border border-green-500/40 hover:bg-green-400/40 text-green-600 disabled:opacity-80",
};

export const InventoryCard = ({
  name,
  price,
  status,
  lastUpdate,
  isMedicine,
  totalUnit,
  activePrinciple,
  handler,
}) => {
  const chip = STATUS_CHIP[status];
  const ChipIcon = chip?.icon;

  return (
    <ItemCard
      icon={isMedicine ? LuPill : LuClipboardPlus}
      iconClassName={
        isMedicine
          ? "bg-error-container text-on-error-container"
          : "bg-secondary-fixed text-on-secondary-container"
      }
      title={name}
      meta={
        <>
          {price === 0 ? "Reclamado" : formatMoney(price)} • x{totalUnit}
          {activePrinciple && ` • ${activePrinciple} `}
        </>
      }
      chip={
        ChipIcon && (
          <>
            <span className="text-sm">
              <ChipIcon />
            </span>
            {status}
          </>
        )
      }
      chipClassName={chip?.classes}
      dateLabel="Ultima compra"
      dateValue={defaultDate(lastUpdate)}
      action={
        <button
          onClick={handler}
          disabled={status === "en orden"}
          className={cn(
            "px-8 py-3.5 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer",
            STATUS_BUTTON[status],
          )}
        >
          {status === "en orden" ? "En orden" : "Comprar"}
        </button>
      }
    />
  );
};
