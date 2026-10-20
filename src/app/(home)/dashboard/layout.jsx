import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { mainPatientQueryOptions } from "@/hooks/tanstack/query/useQueryPatient";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Dashboard({ children }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(mainPatientQueryOptions());

  return (
    <div className="max-h-[90dvh] min-h-[90dvh] flex overflow-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sidebar />
        {children}
      </HydrationBoundary>
    </div>
  );
}
