import { Title } from "@/components/ui/title/Title";
import { MedicationCard } from "@/components/medicine/medication/MedicationCard";
import {
  LuCircleAlert,
  LuClipboardPlus,
  LuPill,
  LuTriangleAlert,
} from "react-icons/lu";
import { Medication } from "@/components/medicine/medication/Medication";
import { Cart } from "@/components/ui/cart/Cart";

const titleData = {
  title: "Medicamentos y suplementos",
  subtitle:
    "Gestionar las recargas de medicamentos esenciales y realizar un seguimiento del cumplimiento familiar.",
};

export default function Medicine() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 not-scrollbar">
      <Title title={titleData.title} subtitle={titleData.subtitle} />
      <div className="lg:grid lg:grid-cols-12 xl:gap-12 relative">
        <div className="lg:col-span-8">
          <Medication />
        </div>
        <div className="lg:col-span-4 hidden xl:block">
          <Cart />
        </div>
      </div>
    </div>
  );
}
