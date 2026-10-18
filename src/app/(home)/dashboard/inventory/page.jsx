import { Index } from "@/components/dashboard/inventory/Index";
import { inventoryQueryOptions } from "@/hooks/tanstack/query/useQueryInventory";
import { getQueryClient } from "@/utils/tanstackQuery-config";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Inventario",
  description:
    "Controla las existencias del tratamiento: registra medicamentos, suplementos y suministros, y actualiza su disponibilidad cuando sea necesario.",
  robots: {
    index: false,
    follow: false,
  },
};

const titleData = {
  title: metadata.title,
  subtitle: "Inventario de tratamiento",
  description: metadata.description,
};

export default async function InventoryDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(inventoryQueryOptions(params));

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
