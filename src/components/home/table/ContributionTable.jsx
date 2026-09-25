"use client";

import { LuDownload, LuListFilter } from "react-icons/lu";

import { UserTable } from "./UserTable";
import { FooterButton } from "./FooterButton";
import { usePagination } from "@/hooks/usePagination";
import { useContributionQueryAll } from "@/hooks/tanstack/query/useQueryContribution";

export const ContributionTable = () => {
  const { data } = useContributionQueryAll({ limit: 20 });
  const {
    page,
    endIndex,
    startIndex,
    isFirstPage,
    islastPage,
    totalPages,
    prevPage,
    nextPage,
  } = usePagination(data?.data?.length ?? 1, 4);

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
