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
  patientId,
  page = 1,
  limit = 10,
}) => {
  const normailized = {
    page,
    limit,
    search: search ?? "",
    role: role ?? "",
    relationship: relationship ?? "",
    patientId: patientId ?? "",
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

export const userQueryByIdOptions = (id, patientId) =>
  queryOptions({
    queryKey: ["user", { id, patientId: patientId ?? "" }],
    queryFn: () => getById(id, patientId),
  });

export const useUserQueryById = (id, patientId) =>
  useSuspenseQuery(userQueryByIdOptions(id, patientId));
