import { baseUrlUser, baseUrlUserDashboard } from "./config";
import { getServiceError } from "../error";

export const getAllUsers = async (queryParams) => {
  const queries = {};

  if (queryParams.search) queries.search = queryParams.search;
  if (queryParams.role) queries.role = queryParams.role;
  if (queryParams.relationship) queries.relationship = queryParams.relationship;
  if (queryParams.page) queries.page = queryParams.page;
  if (queryParams.limit) queries.limit = queryParams.limit;
  if (queryParams.patientId) queries.patientId = queryParams.patientId;

  const querys = new URLSearchParams(queries).toString();
  const enpoint = querys.length ? `/?${querys}` : "/";

  try {
    const { data } = await baseUrlUser.get(enpoint);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const getById = async (id, patientId) => {
  try {
    const queries = patientId ? { patientId } : {};
    const querys = new URLSearchParams(queries).toString();
    const endpoint = querys.length ? `/${id}?${querys}` : `/${id}`;

    const { data } = await baseUrlUser.get(endpoint);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const updateUserRole = async (id, role) => {
  try {
    const { data } = await baseUrlUserDashboard.put(`/${id}`, { role });
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
