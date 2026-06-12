"use client";

import React from "react";
import { DetailsRow } from "./DetailsRow";
import { FooterButton } from "./FooterButton";
import { usePagination } from "@/hooks/usePagination";

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

const DETAILS = [
  {
    id: 0,
    date: "2026-05-12",
    amount: "450000",
    purpose: "Medicamentos Mensuales",
  },

  {
    id: 1,
    date: "2026-05-15",
    amount: "750000",
    purpose: "Paga de yasmin ",
  },
  {
    id: 2,
    date: "2026-05-12",
    amount: "450000",
    purpose: "Medicamentos Mensuales",
  },

  {
    id: 3,
    date: "2026-05-15",
    amount: "750000",
    purpose: "Paga de yasmin ",
  },
  {
    id: 4,
    date: "2026-05-12",
    amount: "450000",
    purpose: "Medicamentos Mensuales",
  },

  {
    id: 5,
    date: "2026-05-15",
    amount: "750000",
    purpose: "Paga de yasmin ",
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
  const {
    page,
    endIndex,
    startIndex,
    isFirstPage,
    islastPage,
    totalPages,
    prevPage,
    nextPage,
  } = usePagination(DETAILS.length, 5);

  const visibleDetails = DETAILS.slice(startIndex, endIndex);

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
