import React from "react";
import { GlassDefault } from "../glass/GlassDefault";
import { ButtonVariant } from "../buttons/ButtonVariant";

export const GlassPaginationBasic = ({
  pageNumber,
  totalPages,
  hasNext,
  hasPrev,
  handleNext,
  handlePrev,
}) => {
  return (
    <GlassDefault
      classNameWrapper="rounded-full p-2 hover:p-2.5 hover:scale-98"
      classNameTint="bg-black/8"
      className="flex justify-between items-center gap-2 w-full py-1 px-4"
    >
      <span className="text-sm md:text-md text-primary flex gap-1">
        Pagina {pageNumber}
        <span className="hidden sm:block">/ {totalPages}</span>
      </span>
      <div className="space-x-4 flex">
        <ButtonVariant
          onClick={handlePrev}
          disabled={!hasPrev}
          variant="secundary"
          className="disabled:opacity-40 text-xs px-4"
        >
          atras
        </ButtonVariant>
        <ButtonVariant
          onClick={handleNext}
          disabled={!hasNext}
          className="disabled:opacity-40 text-xs px-4"
        >
          Siguente
        </ButtonVariant>
      </div>
    </GlassDefault>
  );
};
