import { getAllExpenses } from "@/services/expenses/expenses";
import {
  queryOptions,
  useSuspenseQuery,
  keepPreviousData,
} from "@tanstack/react-query";

export const expensesQueryOptions = ({
  category,
  search,
  page = 1,
  limit = 10,
}) => {
  const normailized = {
    page,
    limit,
    category: category ?? "",
    search: search ?? "",
  };

  return queryOptions({
    queryKey: ["expenses", normailized],
    queryFn: () => getAllExpenses({ ...normailized }),
    placeholderData: keepPreviousData,
  });
};

export const useExpensesQueryAll = (queryParams) =>
  useSuspenseQuery(expensesQueryOptions(queryParams));
