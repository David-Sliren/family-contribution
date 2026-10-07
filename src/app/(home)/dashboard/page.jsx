import { Index } from "@/components/dashboard/home/Index";
import { eventsQueryOptions } from "@/hooks/tanstack/query/useQueryEvent";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HomePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(eventsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Index />
    </HydrationBoundary>
  );
}
