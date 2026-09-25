import { getAllContribution } from "@/services/contribution/contribution";
import {
  keepPreviousData,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";

// opciones para hacer prechechin en el servidor
export const contributionQueryOptions = ({
  purpose,
  method,
  status,
  page = 1,
  limit = 10,
}) => {
  const normailized = {
    page,
    limit,
    purpose: purpose ?? "",
    method: method ?? "",
    status: status ?? "",
  };

  return queryOptions({
    queryKey: ["contributions", normailized],
    queryFn: () => getAllContribution({ ...normailized }),
    placeholderData: keepPreviousData,
  });
};

// useSuspenseQuery para que los datos vengan precargados desde el servidor
export const useContributionQueryAll = (queryParams) =>
  useSuspenseQuery(contributionQueryOptions(queryParams));
