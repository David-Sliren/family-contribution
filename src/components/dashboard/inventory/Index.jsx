import { DashboardShell } from "../layout/DashboardShell";
import { InventoryGrid } from "./InventoryGrid";
import { Toolbar } from "../ui/bar/Toolbar";
import { AddInventoryDialog } from "./AddInventoryDialog";
import { ButtonVariant } from "@/components/ui/buttons/ButtonVariant";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <div className="flex flex-col items-center gap-2 py-2 sm:flex-row">
        <Toolbar searchName="Buscar artículo" selectFilter="inventario" optionInitialName="Todos">
          <option value="en orden">En orden</option>
          <option value="bajo">Bajo</option>
          <option value="agotado">Agotado</option>
        </Toolbar>
        <ButtonVariant className="w-fit text-xs" variant="primary" commandfor="add-inventory" command="show-modal">Añadir artículo</ButtonVariant>
      </div>
      <AddInventoryDialog />
      <InventoryGrid />
    </DashboardShell>
  );
};
