import { Index } from "@/components/dashboard/inventory/Index";
import { inventoryQueryOptions } from "@/hooks/tanstack/query/useQueryInventory";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
export default async function InventoryDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(inventoryQueryOptions(params));

  const metadata = {
    title: "Inventario",
    subtitle: "Inventario de tratamiento",
    description:
      "Controla las existencias del tratamiento: registra medicamentos, suplementos y suministros, y actualiza su disponibilidad cuando sea necesario.",
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
