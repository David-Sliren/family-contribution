"use client";
import { ADDITIONAL_COST } from "@/constants/adidtionalCost";
import { CostCard } from "./CostCard";
import { useMedicineStorage } from "@/store/medicineStore";

export const Additional = () => {
  const { addProducts } = useMedicineStorage();

  return (
    <div className="space-y-6 h-fit xl:max-h-196 overflow-x-hidden not-scrollbar animate-slide-in-bottom xl:scroll-hiden pb-8">
      {ADDITIONAL_COST.map((m) => (
        <CostCard key={m.id} {...m} handler={() => addProducts(m)} />
      ))}
    </div>
  );
};
