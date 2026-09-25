import { Hero } from "@/components/home/hero/Hero";
import { Stats } from "@/components/home/stats/Stats";
import { ContributionTable } from "@/components/home/table/ContributionTable";
import { NotificationPayment } from "@/components/ui/notifications/NotificationPayment";
import { titleFont } from "@/config/fonts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { contributionQueryOptions } from "@/hooks/tanstack/query/useQueryContribution";
import { userQueryAllOptions } from "@/hooks/tanstack/query/useQueryUser";
import { mainPatientQueryOptions } from "@/hooks/tanstack/query/useQueryPatient";

export default async function Home({ searchParams }) {
  const query = await searchParams;
  const state = query.state;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(userQueryAllOptions({ page: 1, limit: 20 })),
    queryClient.prefetchQuery(contributionQueryOptions({ limit: 20 })),
    queryClient.prefetchQuery(mainPatientQueryOptions()),
  ]);

  return (
    <div className={titleFont.className}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Hero />
        <Stats />
        <ContributionTable />
      </HydrationBoundary>
      <NotificationPayment status={state} />
    </div>
  );
}
