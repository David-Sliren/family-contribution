"use client";

import React from "react";
import { DetailsRow } from "./DetailsRow";
import { FooterButton } from "./FooterButton";
import { usePagination } from "@/hooks/usePagination";
import { useUserStore } from "@/components/provaider/AuthProvider";
import { sortByDate } from "@/utils/sorts";

const HEAD_ROW = [
  {
    label: "Fecha",
  },
  {
    label: "Monto",
    className: "text-right",
  },
  {
    label: "Proposito",
    className: " md:text-right",
  },
];

const HeadRow = ({ label, className }) => {
  return (
    <th
      className={`px-8 py-5 font-manrope font-bold text-on-surface-variant text-sm uppercase tracking-widest animate-slide-in-left ${className}`}
    >
      {label}
    </th>
  );
};

export const TableContribuition = () => {
  const userContributions = useUserStore((state) => state.user?.contributions);

  const {
    page,
    endIndex,
    startIndex,
    isFirstPage,
    islastPage,
    totalPages,
    prevPage,
    nextPage,
  } = usePagination(userContributions?.length || 1, 5);

  const visibleDetails =
    sortByDate(userContributions || [])?.slice(startIndex, endIndex) || [];

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low">
            {HEAD_ROW.map((hr) => (
              <HeadRow
                key={hr.label}
                label={hr.label}
                className={hr.className}
              />
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/5">
          {visibleDetails.map((dr) => (
            <DetailsRow key={dr.id} {...dr} />
          ))}
        </tbody>
      </table>

      <FooterButton
        prev={prevPage}
        next={nextPage}
        last={totalPages}
        current={page + 1}
        isFirstPage={isFirstPage}
        isLastPage={islastPage}
      />
    </div>
  );
};
