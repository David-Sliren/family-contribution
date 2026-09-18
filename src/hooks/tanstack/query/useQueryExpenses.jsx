import { getAllExpenses } from "@/services/expenses/expenses";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

// opciones para hacer prechechin en el servidor
export const expensesQueryOptions = () =>
  queryOptions({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });

// useSuspenseQuery para que los datos vengan precargados desde el servidor
export const useExpensesQueryAll = () =>
  useSuspenseQuery(expensesQueryOptions());
