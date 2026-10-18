import { Index } from "@/components/dashboard/expenses/Index";
import { expensesQueryOptions } from "@/hooks/tanstack/query/useQueryExpenses";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Gastos",
  description:
    "Registra, consulta y actualiza los gastos familiares para llevar un control claro de cada compra y su categoría.",
  robots: {
    index: false,
    follow: false,
  },
};

const titleData = {
  title: metadata.title,
  subtitle: "Registro de gastos",
  description: metadata.description,
};

export default async function ExpenseDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(expensesQueryOptions(params));

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
