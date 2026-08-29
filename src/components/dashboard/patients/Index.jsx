import { DashboardShell } from "../layout/DashboardShell";
import { Toolbar } from "../ui/bar/Toolbar";
import { AddPatientDialog } from "./AddPatientDialog";
import { TablePatiens } from "./TablePatiens";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <section className="flex flex-wrap gap-5 items-center py-2 pb-8 z-10">
        <Toolbar selectFilter="patients" optionInitialName="Todos" />
        <AddPatientDialog />
      </section>
      <TablePatiens />
    </DashboardShell>
  );
};
