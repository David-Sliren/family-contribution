import { getAllInventory } from "@/services/inventory/inventory";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const inventoryQueryOptions = () =>
  queryOptions({
    queryKey: ["inventory"],
    queryFn: getAllInventory,
  });

export const useInventoryQueryAll = () =>
  useSuspenseQuery(inventoryQueryOptions());
