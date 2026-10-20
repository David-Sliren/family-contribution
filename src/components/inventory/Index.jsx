import { Suspense } from "react";
import { PageLayout } from "@/components/ui/layout/PageLayout";
import { SelectFilter } from "@/components/ui/inputs/SearchInput";
import { ThreePoints } from "@/components/ui/loader/ThreePoints";
import { Cart } from "@/components/ui/cart/Cart";
import { InventoryList } from "./InventoryList";

export const Index = ({ title, subtitle, description }) => {
  return (
    <PageLayout title={title} subtitle={subtitle} description={description}>
      <div className="lg:grid lg:grid-cols-12 xl:gap-12 relative">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap gap-2.5 items-center mb-6">
            <SelectFilter
              selectFilter="category"
              className="w-fit"
              fieldValues={["-categoria", "medicina", "suplemento", "suministro"]}
            />
            <SelectFilter
              selectFilter="status"
              className="w-fit"
              fieldValues={["-estado", "en orden", "bajo", "agotado"]}
            />
          </div>
          <Suspense fallback={<ThreePoints />}>
            <InventoryList />
          </Suspense>
        </div>
        <div className="lg:col-span-4 hidden xl:block">
          <Cart />
        </div>
      </div>
    </PageLayout>
  );
};