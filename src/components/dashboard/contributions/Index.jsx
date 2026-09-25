import { DashboardShell } from "../layout/DashboardShell";
import { SelectFilter } from "@/components/ui/inputs/SearchInput";
import { ContributionList } from "./ContributionList";
import { Suspense } from "react";
import { ThreePoints } from "@/components/ui/loader/ThreePoints";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <div className="flex flex-wrap gap-2 items-center py-2 z-10">
        <SelectFilter
          selectFilter="purpose"
          fieldValues={["-proposito", "medicinas", "facturas", "cuidador"]}
        />
        <SelectFilter
          selectFilter="method"
          fieldValues={["-metodo", "pasarela", "efectivo", "transferencia"]}
        />
        <SelectFilter
          selectFilter="status"
          fieldValues={["-estado", "confirmado", "pendiente"]}
        />
      </div>

      <Suspense fallback={<ThreePoints />}>
        <ContributionList />
      </Suspense>
    </DashboardShell>
  );
};
