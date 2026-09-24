"use client";

import { useRef, useState } from "react";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";
import { useInventoryQueryAll } from "@/hooks/tanstack/query/useQueryInventory";
import { InventoryCard } from "./InventoryCard";
import { UpdateInventoryDialog } from "./UpdateInventoryDialog";
import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs";
import { parseAsInteger } from "nuqs";
import { GlassPaginationBasic } from "@/components/ui/glass-componenst/GlassPagination";

export function InventoryGrid() {
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));

  const [category] = useQueryState("category", parseAsString.withDefault(""));

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ clearOnDefault: true, scroll: true }),
  );
  const [inventoryToEdit, setInventoryToEdit] = useState(null);
  const dialogRef = useRef(null);
  const { data: inventory } = useInventoryQueryAll({
    status,
    search,
    category,
    page: page,
    limit: 10,
  });
  const pagination = inventory.pagination;

  function handleEdit(item) {
    setInventoryToEdit(item);
    dialogRef.current?.showModal();
  }

  function handleNextPage() {
    setPage((old) => old + 1);
  }

  function handlePrevPage() {
    setPage((old) => Math.max(old - 1, 1));
  }

  if (!inventory.data.length)
    return <AnimationEmpy title="No hay artículos en el inventario" />;

  return (
    <section className="space-y-2.5">
      <section className="flex flex-col justify-between min-h-140 max-h-140 overflow-y-auto scroll-hiden space-y-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <UpdateInventoryDialog
            inventory={inventoryToEdit}
            dialogRef={dialogRef}
          />
          {inventory.data.map((item) => (
            <InventoryCard key={item.id} inventory={item} onEdit={handleEdit} />
          ))}
        </div>
      </section>

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
}
