import { Additional } from "@/components/additional-cost/Additional";
import { Title } from "@/components/ui/title/Title";

const titleData = {
  title: "Costos Adicionales",
  subtitle:
    "Administra los gastos extra y visualiza el uso de los fondos aportados con total transparencia.",
};

export default function AdditionalCost() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 not-scrollbar">
      <Title title={titleData.title} subtitle={titleData.subtitle} />
      <div className="lg:grid lg:grid-cols-12 xl:gap-12 relative">
        <div className="lg:col-span-8">
          <Additional />
        </div>
      </div>
    </div>
  );
}
