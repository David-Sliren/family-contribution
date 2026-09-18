import { ButtonVariant } from "@/components/ui/buttons/ButtonVariant";
import { DashboardShell } from "../layout/DashboardShell";
import { Toolbar } from "../ui/bar/Toolbar";
import { ListExpenses } from "./cards/ListExpenses";
import { AddExpenseDialog } from "./AddExpenseDialog";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <div className="flex flex-col sm:flex-row gap-2 items-center py-2 z-10">
        <Toolbar selectFilter="expenses" optionInitialName="Todos" />
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
      <ListExpenses />
    </DashboardShell>
  );
};
