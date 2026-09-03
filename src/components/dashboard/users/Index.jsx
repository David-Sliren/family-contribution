import { DashboardShell } from "../layout/DashboardShell";
import { Toolbar } from "../ui/bar/Toolbar";
import { CardsUser } from "./AllUsers";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <Toolbar selectFilter="user" optionInitialName="Todos" />
      <CardsUser />
    </DashboardShell>
  );
};
