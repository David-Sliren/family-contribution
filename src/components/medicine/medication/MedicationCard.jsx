"use client";
import { formatMoney } from "@/config/money";
import React from "react";
import clsx from "clsx";
import {
  LuCircleAlert,
  LuClipboardPlus,
  LuPill,
  LuSparkle,
  LuSpeaker,
  LuTriangleAlert,
} from "react-icons/lu";
import { defaultDate } from "@/config/dates";

export const MedicationCard = ({
  name,
  price,
  status,
  lastUpdate,
  isMedicine,
  totalUnit,
  activePrinciple,
  handler,
}) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl editorial-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start gap-5 ">
        <div
          className={clsx(
            "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
            {
              "bg-error-container text-on-error-container": isMedicine,
              "bg-secondary-fixed text-on-secondary-container": !isMedicine,
            },
          )}
        >
          <span className="text-3xl">
            {isMedicine ? <LuPill /> : <LuClipboardPlus />}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold font-headline text-on-surface uppercase">
            {name}
          </h3>
          <p className="text-sm font-medium text-on-surface-variant">
            {price === 0 ? "Reclamado" : formatMoney(price)} • x{totalUnit}
            {activePrinciple && ` • ${activePrinciple} `}
          </p>
          <div
            className={clsx(
              "mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ",
              {
                "bg-yellow-500/20 text-yellow-600": status === "bajo",
                "bg-error/10 text-error": status === "agotado",
                "bg-green-500/10 text-green-600": status === "en orden",
              },
            )}
          >
            <span className="text-sm">
              {(status === "agotado" && <LuCircleAlert />) ||
                (status === "bajo" && <LuTriangleAlert />) ||
                (status === "en orden" && <LuSparkle />)}
            </span>
            {status}
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex flex-col md:items-end justify-center">
          <span className="text-xs font-semibold text-outline uppercase tracking-widest mb-1">
            Ultima compra
          </span>
          <span className="text-on-surface font-medium">
            {defaultDate(lastUpdate)}
          </span>
        </div>

        <button
          onClick={handler}
          disabled={status === "en orden"}
          className={clsx(
            "px-8 py-3.5 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer",
            {
              "bg-green-500/20 border border-green-500/40 hover:bg-green-400/40 text-green-600 disabled:opacity-80":
                status === "en orden",
              "bg-error/20 border border-error/40 hover:bg-error/40 text-on-error-container":
                status === "agotado",
              "bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/40 text-yellow-600":
                status === "bajo",
            },
          )}
        >
          {status === "en orden" ? "En orden" : "Comprar"}
        </button>
      </div>
    </div>
  );
};
