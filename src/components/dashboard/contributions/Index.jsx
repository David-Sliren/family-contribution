import { DashboardShell } from "../layout/DashboardShell";
import { Toolbar } from "../ui/bar/Toolbar";
import { CardContribution, CardContributions } from "./CardContributions";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <Toolbar selectFilter="contributions" optionInitialName="Todos" />
      <CardContributions />
    </DashboardShell>
  );
};
