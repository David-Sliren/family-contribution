import { Index } from "@/components/dashboard/expenses/Index";

export default function ExpenseDashboard() {
  const metadata = {
    title: "Gastos",
    subtitle: "Registro de gastos",
    description:
      "Registra, consulta y actualiza los gastos familiares para llevar un control claro de cada compra y su categoría.",
  };

  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
