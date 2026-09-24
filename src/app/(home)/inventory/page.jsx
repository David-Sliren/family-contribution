import { Index } from "@/components/inventory/Index";

const titleData = {
  title: "Inventario",
  subtitle: "Inventario de tratamiento",
  description:
    "Revisa la disponibilidad del tratamiento: medicamentos, suplementos y suministros con su estado actual y solicita lo que necesites.",
};

export default function Inventory() {
  return (
    <Index
      title={titleData.title}
      subtitle={titleData.subtitle}
      description={titleData.description}
    />
  );
}