import { Index } from "@/components/expenses/Index";

const titleData = {
  title: "Gastos",
  subtitle: "Registro de gastos",
  description:
    "Consulta con transparencia el uso de los fondos: revisa cada gasto realizado, su categoría y su fecha.",
};

export const metadata = {
  title: titleData.title,
  description: titleData.description,
  robots: {
    index: false,
    follow: false,
  },
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