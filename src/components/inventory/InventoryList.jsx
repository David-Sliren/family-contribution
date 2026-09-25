"use client";
import { InventoryCard } from "./InventoryCard";
import { useMedicineStorage } from "@/store/medicineStore";
import { useInventoryQueryAll } from "@/hooks/tanstack/query/useQueryInventory";
import { useQueryState } from "nuqs";
import { parseAsString, parseAsInteger } from "nuqs";
import { GlassPaginationBasic } from "@/components/ui/glass-componenst/GlassPagination";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";

export const InventoryList = () => {
  const { addProducts } = useMedicineStorage();
  const [category] = useQueryState("category", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ clearOnDefault: true, scroll: true }),
  );

  const { data } = useInventoryQueryAll({ category, status, page, limit: 10 });
  const pagination = data.pagination;

  function handleNextPage() {
    setPage((old) => old + 1);
  }

  function handlePrevPage() {
    setPage((old) => Math.max(old - 1, 1));
  }

  if (!data.data.length)
    return <AnimationEmpy title="No hay artículos en el inventario" />;

  return (
    <section className="space-y-2.5">
      <div className="space-y-6 min-h-120 overflow-x-hidden not-scrollbar animate-fade-in xl:scroll-hiden pb-8">
        {data.data.map((item) => (
          <InventoryCard
            key={item.id}
            {...{
              name: item.name,
              price: item.price,
              status: item.status,
              lastUpdate: item.updatedAt,
              isMedicine: item.category === "medicina",
              totalUnit: item.totalUnit,
              activePrinciple: item.concentration,
            }}
            handler={() =>
              addProducts({
                ...item,
                isMedicine: item.category === "medicina",
                activePrinciple: item.concentration,
              })
            }
          />
        ))}
      </div>

      <GlassPaginationBasic
        pageNumber={page}
        totalPages={pagination.totalPages}
        hasNext={pagination.hasNextPage}
        hasPrev={pagination.hasPrevPage}
        handleNext={handleNextPage}
        handlePrev={handlePrevPage}
      />
    </section>
  );
};
