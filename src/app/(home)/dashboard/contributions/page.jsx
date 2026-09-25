import { Index } from "@/components/dashboard/contributions/Index";
import { contributionQueryOptions } from "@/hooks/tanstack/query/useQueryContribution";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function ContributionDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(contributionQueryOptions(params));

  const metadata = {
    title: "Contribuciones",
    subtitle: "Registro de contribuciones",
    description:
      "Consulta las contribuciones registradas por cada usuario y actualiza sus datos para mantener el historial financiero al día.",
  };

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
