import { Index } from "@/components/dashboard/inventory/Index";

export default async function InventoryDashboard({ searchParams }) {
  const params = await searchParams;

  const metadata = {
    title: "Inventario",
    subtitle: "Inventario de tratamiento",
    description:
      "Controla las existencias del tratamiento: registra medicamentos, suplementos y suministros, y actualiza su disponibilidad cuando sea necesario.",
  };

  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
