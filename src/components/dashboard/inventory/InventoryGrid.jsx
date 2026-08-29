import { InventoryCard } from "./InventoryCard";

export function InventoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from("jojo").map((_, i) => (
        <InventoryCard key={i} />
      ))}
    </div>
  );
}
