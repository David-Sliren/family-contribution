"use client";

import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import { useUserQueryAll } from "@/hooks/tanstack/query/useQueryUser";
import { reduceGoal } from "@/utils/goals";
import { LuSquareChartGantt } from "react-icons/lu";

export const DEFAULT_GOAL = 100000;

export const FloatCard = () => {
  const mainPatient = useMainPatientQuery();
  const user = useUserQueryAll({ page: 1, limit: 20 }); // queda pendiente para cuando se inserten los fondos a el paciente, eliminar luego de eso.

  const wallet =
    user.data?.data?.reduce((acc, item) => acc + item?.totalContributed, 0) ?? 0;

  const GOAL = reduceGoal(wallet ?? 0, mainPatient.data?.goal ?? DEFAULT_GOAL);

  return (
    <article className="absolute -bottom-6 -left-6 bg-surface-container-lowest/90 backdrop-blur-md p-6 rounded-3xl tonal-shadow-sm border border-outline-variant/10 max-w-[240px] animate-slide-in-bottom">
      <article className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">
            <LuSquareChartGantt />
          </span>
        </div>
        <div>
          <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">
            Meta
          </p>
          <p className="text-lg text-gray-950 font-bold">{GOAL}% Completado</p>
        </div>
      </article>
      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${GOAL}%` }} />
      </div>
    </article>
  );
};
