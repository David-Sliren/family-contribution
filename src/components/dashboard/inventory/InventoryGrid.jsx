"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";
import { useInventoryQueryAll } from "@/hooks/tanstack/query/useQueryInventory";
import { InventoryCard } from "./InventoryCard";
import { UpdateInventoryDialog } from "./UpdateInventoryDialog";

export function InventoryGrid() {
  const { data } = useInventoryQueryAll();
  const searchParams = useSearchParams();
  const [inventoryToEdit, setInventoryToEdit] = useState(null);
  const dialogRef = useRef(null);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const status = searchParams.get("inventario") ?? "";
  const inventory = data.filter((item) => {
    const matchesSearch = [item.name, item.category, item.concentration]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(search));
    return matchesSearch && (!status || item.status === status);
  });

  function handleEdit(item) {
    setInventoryToEdit(item);
    dialogRef.current?.showModal();
  }

  if (!inventory.length)
    return <AnimationEmpy title="No hay artículos en el inventario" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
      <UpdateInventoryDialog
        inventory={inventoryToEdit}
        dialogRef={dialogRef}
      />
      {inventory.map((item) => (
        <InventoryCard key={item.id} inventory={item} onEdit={handleEdit} />
      ))}
    </div>
  );
}
