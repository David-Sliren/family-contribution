import { getAllInventory } from "@/services/inventory/inventory";
import {
  queryOptions,
  useSuspenseQuery,
  keepPreviousData,
} from "@tanstack/react-query";

export const inventoryQueryOptions = ({
  status,
  search,
  category,
  patientId,
  page = 1,
  limit = 10,
}) => {
  const normailized = {
    page,
    limit,
    category: category ?? "",
    status: status ?? "",
    search: search ?? "",
    patientId: patientId ?? "",
  };

  return queryOptions({
    queryKey: ["inventory", normailized],
    queryFn: () => getAllInventory({ ...normailized }),
    placeholderData: keepPreviousData,
  });
};

export const useInventoryQueryAll = (queryParams) =>
  useSuspenseQuery(inventoryQueryOptions(queryParams));
