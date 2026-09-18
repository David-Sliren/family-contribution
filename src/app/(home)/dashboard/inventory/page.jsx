import { Index } from "@/components/dashboard/inventory/Index";

export default async function InventoryDashboard({ searchParams }) {
  const params = await searchParams;

  const metadata = {
    title: "Inventario",
    subtitle: "Inventario de tratamiento",
    description:
      "Aquí puedes registrar y administrar los artículos del inventario de tratamiento, incluyendo medicamentos, suplementos y suministros.",
  };

  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
