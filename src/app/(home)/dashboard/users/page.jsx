import { Index } from "@/components/dashboard/users/Index";
import { userQueryAllOptions } from "@/hooks/tanstack/query/useQueryUser";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function UsersDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(userQueryAllOptions(params));

  const metadata = {
    title: "Usuarios",
    subtitle: "Registro de usuarios",
    description:
      "Consulta los usuarios registrados, sus roles y el total de sus aportes; también puedes registrar nuevas contribuciones para cada uno.",
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