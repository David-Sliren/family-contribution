import { Index } from "@/components/expenses/Index";

const titleData = {
  title: "Gastos",
  subtitle: "Registro de gastos",
  description:
    "Consulta con transparencia el uso de los fondos: revisa cada gasto realizado, su categoría y su fecha.",
};

export default function Expenses() {
  return (
    <Index
      title={titleData.title}
      subtitle={titleData.subtitle}
      description={titleData.description}
    />
  );
}