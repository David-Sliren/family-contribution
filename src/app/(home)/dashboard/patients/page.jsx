import { Index } from "@/components/dashboard/patients/Index";
import { allPatientQueryOptions } from "@/hooks/tanstack/query/useQueryPatient";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const metadata = {
  title: "Pacientes",
  subtitle: "Registro de pacientes",
  description:
    "Registra a los pacientes de tu familia y mantiene actualizada su información clínica y de contacto.",
};

export default async function PatientsDashboard() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(allPatientQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Index
        title={metadata.title}
        subtitle={metadata.subtitle}
        description={metadata.description}
      />
    </HydrationBoundary>
  );
}
