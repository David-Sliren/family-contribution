import { Suspense } from "react";
import { DashboardShell } from "../layout/DashboardShell";
import { Toolbar } from "../ui/bar/Toolbar";
import { AddPatientDialog } from "./AddPatientDialog";
import { PatientGrid } from "./PatientGrid";
import { ThreePoints } from "@/components/ui/loader/ThreePoints";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <section className="flex flex-wrap gap-5 items-center py-2 pb-8 z-10">
        <Toolbar searchName="Buscar paciente" />
        <AddPatientDialog />
      </section>
      <Suspense fallback={<ThreePoints />}>
        <PatientGrid />
      </Suspense>
    </DashboardShell>
  );
};
