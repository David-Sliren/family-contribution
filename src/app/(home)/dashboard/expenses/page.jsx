import { Index } from "@/components/dashboard/expenses/Index";
import { expensesQueryOptions } from "@/hooks/tanstack/query/useQueryExpenses";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function ExpenseDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(expensesQueryOptions(params));

  const metadata = {
    title: "Gastos",
    subtitle: "Registro de gastos",
    description:
      "Registra, consulta y actualiza los gastos familiares para llevar un control claro de cada compra y su categoría.",
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
