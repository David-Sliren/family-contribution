import { DashboardShell } from "../layout/DashboardShell";
import { Toolbar } from "../ui/bar/Toolbar";
import { SelectFilter } from "@/components/ui/inputs/SearchInput";
import { UserList } from "./UserList";
import { Suspense } from "react";
import { ThreePoints } from "@/components/ui/loader/ThreePoints";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <div className="flex flex-col sm:flex-row gap-2 items-center py-2 z-10">
        <Toolbar searchName="Buscar usuario">
          <SelectFilter
            selectFilter="role"
            fieldValues={["-rol", "user", "carer", "admin"]}
          />
          <SelectFilter
            selectFilter="relationship"
            fieldValues={[
              "-parentesco",
              "hijo",
              "sobrino",
              "esposo",
              "hermano",
              "externo",
              "nieto",
            ]}
          />
        </Toolbar>
      </div>

      <Suspense fallback={<ThreePoints />}>
        <UserList />
      </Suspense>
    </DashboardShell>
  );
};