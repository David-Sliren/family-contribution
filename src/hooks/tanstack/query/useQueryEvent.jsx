import { getAllEvents } from "@/services/event/event";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const eventsQueryOptions = ({
  page = 1,
  limit = 6,
  type,
  patientId,
} = {}) =>
  queryOptions({
    queryKey: [
      "events",
      { page, limit, type: type ?? "", patientId: patientId ?? "" },
    ],
    queryFn: () => getAllEvents({ page, limit, type, patientId }),
  });

export const useEventsQuery = (queryParams) =>
  useSuspenseQuery(eventsQueryOptions(queryParams));
