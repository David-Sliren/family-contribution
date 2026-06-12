"use client";

import React from "react";
import { LuDownload, LuListFilter } from "react-icons/lu";

import { UserTable } from "./UserTable";
import { FooterButton } from "./FooterButton";
import { usePagination } from "@/hooks/usePagination";
import { USER_CONTRIBUTION } from "@/constants/user-contribution";

export const ContributionTable = () => {
  const {
    page,
    currentItems,
    endIndex,
    startIndex,
    isFirstPage,
    islastPage,
    totalItems,
    totalPages,
    prevPage,
    nextPage,
  } = usePagination(USER_CONTRIBUTION.length, 4);

  return (
    <section className="py-24 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl text-gray-950 font-bold tracking-tight mb-4 leading-tight">
              Historial de Colaboraciones
            </h2>
            <p className="text-on-surface-variant font-body">
              Registro en tiempo real de todos los aportes realizados por la
              familia para el fondo de salud de la Abuela.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">
                <LuListFilter className="text-2xl text-gray-950 font-bold" />
              </span>
            </button>
            <button className="p-3 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors">
              <LuDownload className=" text-2xl text-gray-950 font-bold" />
            </button>
          </div>
        </div>
        <div className=" rounded-[2.5rem] overflow-hidden tonal-shadow-sm border border-outline-variant/10 -mx-4 sm:mx-0">
          <UserTable startIndex={startIndex} endIndex={endIndex} />
          <FooterButton
            prev={prevPage}
            next={nextPage}
            last={totalPages}
            current={page + 1}
            isFirstPage={isFirstPage}
            isLastPage={islastPage}
          />
        </div>
      </div>
    </section>
  );
};
