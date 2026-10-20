"use client";

import { AnimationEmpty } from "@/lottie-files/components/AnimationEmpty";
import { DetailsRow } from "./DetailsRow";
import { FooterButton } from "./FooterButton";
import { usePagination } from "@/hooks/usePagination";
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

export const TableContribuition = ({ contributions }) => {
  const userContributions = contributions;

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
    <article className="rounded-xl">
      <div className="overflow-x-auto min-h-114">
        {visibleDetails.length === 0 ? (
          <AnimationEmpty />
        ) : (
          <table className="w-full h-fit text-left border-collapse">
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
        )}
      </div>

      <FooterButton
        prev={prevPage}
        next={nextPage}
        last={totalPages}
        current={page + 1}
        isFirstPage={isFirstPage}
        isLastPage={islastPage}
      />
    </article>
  );
};
