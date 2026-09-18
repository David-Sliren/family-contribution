import { Index } from "@/components/dashboard/expenses/Index";

export default function ExpenseDashboard() {
  const metadata = {
    title: "Gastos",
    subtitle: "Registro de gastos",
    description:
      "En esta sección puedes registrar y gestionar los gastos de tu familia. Puedes añadir nuevos gastos, actualizar los existentes y eliminar aquellos que ya no sean relevantes.",
  };

  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
