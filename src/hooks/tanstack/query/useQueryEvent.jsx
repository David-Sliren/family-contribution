import { getAllEvents } from "@/services/event/event";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const eventsQueryOptions = ({ page = 1, limit = 6, type } = {}) =>
  queryOptions({
    queryKey: ["events", { page, limit, type: type ?? "" }],
    queryFn: () => getAllEvents({ page, limit, type }),
  });

export const useEventsQuery = () => useSuspenseQuery(eventsQueryOptions());
