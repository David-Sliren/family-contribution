import React from "react";
import { LuDownload } from "react-icons/lu";

export const HeaderStat = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="font-manrope text-2xl font-bold text-on-surface">
        Mis Colaboraciones
      </h2>
      <button className="text-primary font-bold flex items-center gap-2 hover:opacity-80 transition-opacity bg-primary/36 sm:bg-white  p-2 rounded-lg cursor-pointer">
        <span className="hidden sm:block">Exportar Historial </span>
        <LuDownload />
      </button>
    </div>
  );
};
