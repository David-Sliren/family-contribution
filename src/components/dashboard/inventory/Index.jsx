import { DashboardShell } from "../layout/DashboardShell";
import { InventoryGrid } from "./InventoryGrid";
import { Toolbar } from "../ui/bar/Toolbar";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <InventoryGrid />
      <Toolbar selectFilter="inventario" optionInitialName="Todos">
        <option value="en orden">En orden</option>
        <option value="bajo">Bajo</option>
        <option value="agotado">Agotado</option>
      </Toolbar>
    </DashboardShell>
  );
};
