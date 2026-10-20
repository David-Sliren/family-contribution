import { Index } from "@/components/dashboard/contributions/Index";
import { contributionQueryOptions } from "@/hooks/tanstack/query/useQueryContribution";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Contribuciones",
  description:
    "Consulta las contribuciones registradas por cada usuario y actualiza sus datos para mantener el historial financiero al día.",
  robots: {
    index: false,
    follow: false,
  },
};

const titleData = {
  title: metadata.title,
  subtitle: "Registro de contribuciones",
  description: metadata.description,
};

export default async function ContributionDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(contributionQueryOptions(params));

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
