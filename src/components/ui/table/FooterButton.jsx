import { cn } from "@/utils/cn";
import React from "react";

export const FooterButton = ({
  prev,
  next,
  current = 0,
  last = 12,
  isFirstPage,
  isLastPage,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "px-8 py-6 bg-surface-container-low/20 flex justify-between items-center w-full",
        className,
      )}
    >
      <p className="text-sm text-on-surface-variant font-medium">
        pagina {current} de {last}
      </p>
      <div className="flex gap-2">
        <button
          onClick={prev}
          disabled={isFirstPage}
          className="px-4 py-2 bg-surface-container-lowest text-on-surface font-bold text-sm rounded-lg hover:bg-surface-container transition-all cursor-pointer disabled:opacity-30"
        >
          Anterior
        </button>
        <button
          onClick={next}
          disabled={isLastPage}
          className="px-4 py-2 bg-primary text-on-primary font-bold text-sm rounded-lg hover:opacity-90 transition-all cursor-pointer disabled:opacity-30"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
