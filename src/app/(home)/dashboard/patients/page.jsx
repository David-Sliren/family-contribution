import { Index } from "@/components/dashboard/patients/Index";
import { allPatientQueryOptions } from "@/hooks/tanstack/query/useQueryPatient";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Pacientes",
  description:
    "Registra a los pacientes de tu familia y mantiene actualizada su información clínica y de contacto.",
  robots: {
    index: false,
    follow: false,
  },
};

const titleData = {
  title: metadata.title,
  subtitle: "Registro de pacientes",
  description: metadata.description,
};

export default async function PatientsDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(allPatientQueryOptions(params));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Index
        title={titleData.title}
        subtitle={titleData.subtitle}
        description={titleData.description}
      />
    </HydrationBoundary>
  );
}
