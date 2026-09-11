import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { contributionQueryOptions } from "@/hooks/tanstack/query/useQueryContribution";
import {
  allPatientQueryOptions,
  mainPatientQueryOptions,
} from "@/hooks/tanstack/query/useQueryPatient";
import { userQueryAllOptions } from "@/hooks/tanstack/query/useQueryUser";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Dashboard({ children }) {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(allPatientQueryOptions()),
    queryClient.prefetchQuery(mainPatientQueryOptions()),
    queryClient.prefetchQuery(userQueryAllOptions()),
    queryClient.prefetchQuery(contributionQueryOptions()),
  ]);

  return (
    <div className="h-dvh max-h-vh flex bg-surface overflow-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sidebar />
        <main className="px-10 pt-7 pb-12 w-full ">{children}</main>
      </HydrationBoundary>
    </div>
  );
}
