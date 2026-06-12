import { useRouter } from "next/navigation";
import React from "react";

export const ActionsButtons = ({ isSubmitting, buttonName }) => {
  const router = useRouter();
  return (
    <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
      <button
        disabled={isSubmitting}
        className="w-full sm:flex-1 bg-gradient-to-r from-primary to-primary-container text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all font-headline cursor-pointer disabled:opacity-60"
        type="submit"
      >
        {isSubmitting ? "Cargando..." : buttonName}
      </button>
      <button
        onClick={() => router.replace("/")}
        className="w-full sm:w-auto px-8 py-4 text-on-surface-variant font-semibold hover:text-primary transition-colors font-body cursor-pointer"
        type="button"
      >
        Cancelar
      </button>
    </div>
  );
};
