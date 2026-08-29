import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import {
  allPatientQueryOptions,
  mainPatientQueryOptions,
} from "@/hooks/tanstack/query/useQueryPatient";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Dashboard({ children }) {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(allPatientQueryOptions()),
    queryClient.prefetchQuery(mainPatientQueryOptions()),
  ]);

  return (
    <div className="h-dvh max-h-vh flex bg-surface overflow-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sidebar />
        <main className="px-10 pt-7 pb-12 w-full overflow-x-hidden scroll-hiden">
          {children}
        </main>
      </HydrationBoundary>
    </div>
  );
}
