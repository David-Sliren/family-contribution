import { getAllUsers, getById } from "@/services/user/user";
import {
  keepPreviousData,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";

// opciones para hacer prechechin en el servidor
export const userQueryAllOptions = ({
  search,
  role,
  relationship,
  page = 1,
  limit = 10,
}) => {
  const normailized = {
    page,
    limit,
    search: search ?? "",
    role: role ?? "",
    relationship: relationship ?? "",
  };

  return queryOptions({
    queryKey: ["users", normailized],
    queryFn: () => getAllUsers({ ...normailized }),
    placeholderData: keepPreviousData,
  });
};

// useSuspenseQuery para que los datos vengan precargados desde el servidor
export const useUserQueryAll = (queryParams) =>
  useSuspenseQuery(userQueryAllOptions(queryParams));

export const userQueryByIdOptions = (id) =>
  queryOptions({
    queryKey: ["user", id],
    queryFn: () => getById(id),
  });

export const useUserQueryById = (id) =>
  useSuspenseQuery(userQueryByIdOptions(id));
