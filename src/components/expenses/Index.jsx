import { Suspense } from "react";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { SelectFilter } from "@/components/ui/inputs/SearchInput";
import { ThreePoints } from "@/components/ui/loader/ThreePoints";
import { ExpenseList } from "./ExpenseList";

export const Index = ({ title, subtitle, description }) => {
  return (
    <PageLayout title={title} subtitle={subtitle} description={description}>
      <div className="flex flex-wrap gap-2.5 items-center mb-6">
        <SelectFilter
          selectFilter="category"
          className="w-fit"
          fieldValues={[
            "-categoria",
            "transporte",
            "medicina",
            "suplemento",
            "clinico",
            "suministro",
            "cuidador",
          ]}
        />
      </div>
      <Suspense fallback={<ThreePoints />}>
        <ExpenseList />
      </Suspense>
    </PageLayout>
  );
};