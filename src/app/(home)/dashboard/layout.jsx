import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { contributionQueryOptions } from "@/hooks/tanstack/query/useQueryContribution";
import { expensesQueryOptions } from "@/hooks/tanstack/query/useQueryExpenses";
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
    queryClient.prefetchQuery(expensesQueryOptions()),
  ]);

  return (
    <div className="max-h-[90vh] min-h-[90vh] flex bg-surface overflow-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sidebar />
        {children}
      </HydrationBoundary>
    </div>
  );
}
