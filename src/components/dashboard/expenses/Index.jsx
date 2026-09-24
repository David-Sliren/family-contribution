import { ButtonVariant } from "@/components/ui/buttons/ButtonVariant";
import { DashboardShell } from "../layout/DashboardShell";
import { Toolbar } from "../ui/bar/Toolbar";
import { ListExpenses } from "./cards/ListExpenses";
import { AddExpenseDialog } from "./AddExpenseDialog";
import { Suspense } from "react";
import { ThreePoints } from "@/components/ui/loader/ThreePoints";
import { SelectFilter } from "@/components/ui/inputs/SearchInput";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <div className="flex flex-col sm:flex-row gap-2 items-center py-2 z-10">
        <Toolbar
          searchName="Buscar gasto"
          selectFilter="category"
          optionInitialName="Todos"
        >
          <SelectFilter
            selectFilter="category"
            fieldValues={[
              "-categoria",
              "transporte",
              "medicina",
              "suplemento",
              "clinico",
              "suministro",
              "cuidador",
            ]}
          />
        </Toolbar>
        <ButtonVariant
          className="w-fit text-xs"
          variant="primary"
          commandfor="add-expense"
          command="show-modal"
        >
          Añadir Gasto
        </ButtonVariant>
      </div>
      <AddExpenseDialog />

      <Suspense fallback={<ThreePoints />}>
        <ListExpenses />
      </Suspense>
    </DashboardShell>
  );
};
