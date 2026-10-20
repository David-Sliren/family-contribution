import { DashboardShell } from "../layout/DashboardShell";
import { InventoryGrid } from "./InventoryGrid";
import { Toolbar } from "../ui/bar/Toolbar";
import { AddInventoryDialog } from "./AddInventoryDialog";
import { ButtonVariant } from "@/components/ui/buttons/ButtonVariant";
import { Suspense } from "react";
import { ThreePoints } from "@/components/ui/loader/ThreePoints";
import { SelectFilter } from "@/components/ui/inputs/SearchInput";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <div className="flex flex-col items-center gap-2 py-2 sm:flex-row">
        <Toolbar
          searchName="Buscar artículo"
          selectFilter="status"
          optionInitialName="Todos"
        >
          <SelectFilter
            selectFilter="status"
            fieldValues={["-estado", "en orden", "bajo", "agotado"]}
          />

          <SelectFilter
            selectFilter="category"
            fieldValues={["-categoria", "medicina", "suplemento", "suministro"]}
          />
          {/* <option value="en orden">En orden</option>
          <option value="bajo">Bajo</option>
          <option value="agotado">Agotado</option> */}
        </Toolbar>
        <ButtonVariant
          className="w-fit text-xs"
          variant="primary"
          commandfor="add-inventory"
          command="show-modal"
        >
          Añadir artículo
        </ButtonVariant>
      </div>
      <AddInventoryDialog />

      <Suspense fallback={<ThreePoints />}>
        <InventoryGrid />
      </Suspense>
    </DashboardShell>
  );
};
