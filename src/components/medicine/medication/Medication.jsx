"use client";
import { MEDICINES } from "@/constants/medicines";
import { MedicationCard } from "./MedicationCard";
import { useMedicineStorage } from "@/store/medicineStore";

export const Medication = () => {
  const { addProducts } = useMedicineStorage();

  return (
    <div className="space-y-6 h-fit xl:max-h-196 overflow-x-hidden not-scrollbar animate-slide-in-bottom xl:scroll-hiden pb-8">
      {MEDICINES.map((m) => (
        <MedicationCard key={m.id} {...m} handler={() => addProducts(m)} />
      ))}
    </div>
  );
};
