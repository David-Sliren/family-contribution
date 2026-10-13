import { Index } from "@/components/dashboard/home/Index";
import { eventsQueryOptions } from "@/hooks/tanstack/query/useQueryEvent";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const metadata = {
  title: "Principal",
  subtitle: "Resumen de registros",
  description:
    "Mantente al dia con el estado del paciente, los usuarios, las contribuciones, el inventario y los gastos.",
};
export default async function HomePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(eventsQueryOptions());

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
