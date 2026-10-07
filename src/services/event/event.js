import { baseUrlEvents } from "./config";
import { getServiceError } from "../error";

export const getAllEvents = async (queryParams) => {
  const queries = {};

  if (queryParams.page) queries.page = queryParams.page;
  if (queryParams.limit) queries.limit = queryParams.limit;
  if (queryParams.type) queries.type = queryParams.type;

  const querys = new URLSearchParams(queries).toString();
  const endpoint = querys.length ? `/?${querys}` : "/";

  try {
    const { data } = await baseUrlEvents.get(endpoint);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
