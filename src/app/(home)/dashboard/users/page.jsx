import { Index } from "@/components/dashboard/users/Index";
import { userQueryAllOptions } from "@/hooks/tanstack/query/useQueryUser";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Usuarios",
  description:
    "Consulta los usuarios registrados, sus roles y el total de sus aportes; también puedes registrar nuevas contribuciones para cada uno.",
  robots: {
    index: false,
    follow: false,
  },
};

const titleData = {
  title: metadata.title,
  subtitle: "Registro de usuarios",
  description: metadata.description,
};

export default async function UsersDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(userQueryAllOptions(params));

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