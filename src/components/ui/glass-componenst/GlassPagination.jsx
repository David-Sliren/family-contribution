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
      <span className="text-md text-primary">
        Pagina {pageNumber} de {totalPages}
      </span>
      <div className="space-x-4">
        <ButtonVariant
          onClick={handlePrev}
          disabled={!hasPrev}
          className="disabled:opacity-40"
        >
          atras
        </ButtonVariant>
        <ButtonVariant
          onClick={handleNext}
          disabled={!hasNext}
          className="disabled:opacity-40"
        >
          Siguente
        </ButtonVariant>
      </div>
    </GlassDefault>
  );
};
