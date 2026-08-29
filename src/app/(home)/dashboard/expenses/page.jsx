import { Index } from "@/components/dashboard/expenses/Index";

export default async function ExpenseDashboard({ searchParams }) {
  const params = await searchParams;

  const metadata = {
    title: "Gastos",
    subtitle: "Registro de gastos",
    description: "pendiente.",
  };

  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
