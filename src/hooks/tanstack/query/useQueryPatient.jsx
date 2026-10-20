import { getAllPatients, getMainPatient } from "@/services/patient/patient";
import {
  keepPreviousData,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";

// opciones para hacer prechechin en el servidor
export const mainPatientQueryOptions = () =>
  queryOptions({
    queryKey: ["main-patient"],
    queryFn: getMainPatient,
  });

// useSuspenseQuery para que los datos vengan precargados desde el servidor
export const useMainPatientQuery = () =>
  useSuspenseQuery(mainPatientQueryOptions());

export const allPatientQueryOptions = ({
  search,
  page = 1,
  limit = 10,
} = {}) => {
  const normailized = {
    page,
    limit,
    search: search ?? "",
  };

  return queryOptions({
    queryKey: ["patients", normailized],
    queryFn: () => getAllPatients({ ...normailized }),
    placeholderData: keepPreviousData,
  });
};

export const useAllPatientQuery = (queryParams) =>
  useSuspenseQuery(allPatientQueryOptions(queryParams));
