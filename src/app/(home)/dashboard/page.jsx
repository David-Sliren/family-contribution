import { Index } from "@/components/dashboard/home/Index";
import { eventsQueryOptions } from "@/hooks/tanstack/query/useQueryEvent";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Principal",
  description:
    "Mantente al dia con el estado del paciente, los usuarios, las contribuciones, el inventario y los gastos.",
  robots: {
    index: false,
    follow: false,
  },
};

const titleData = {
  title: metadata.title,
  subtitle: "Resumen de registros",
  description: metadata.description,
};

export default async function HomePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(eventsQueryOptions());

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
