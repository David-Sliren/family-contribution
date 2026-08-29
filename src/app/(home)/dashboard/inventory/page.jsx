import { Index } from "@/components/dashboard/inventory/Index";

export default async function InventoryDashboard({ searchParams }) {
  const params = await searchParams;

  const metadata = {
    title: "Inventario",
    subtitle: "Inventario de tratamiento",
    description:
      "Anticipa reposiciones y conserva el contexto de cada tratamiento sin depender de hojas dispersas.",
  };

  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
