import { baseUrlInventory, baseUrlInventoryDashboard } from "./config";
import { getServiceError } from "../error";

export const getAllInventory = async (queryParams) => {
  const queries = {};

  if (queryParams.status) queries.status = queryParams.status;
  if (queryParams.search) queries.search = queryParams.search;
  if (queryParams.category) queries.category = queryParams.category;
  if (queryParams.page) queries.page = queryParams.page;
  if (queryParams.limit) queries.limit = queryParams.limit;

  const querys = new URLSearchParams(queries).toString();
  const enpoint = querys.length ? `/?${querys}` : "/";

  try {
    const { data } = await baseUrlInventory.get(enpoint);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const createInventory = async (dataForm) => {
  try {
    const { data } = await baseUrlInventoryDashboard.post("/", dataForm);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const updateInventory = async (id, dataForm) => {
  try {
    const { data } = await baseUrlInventoryDashboard.put(`/${id}`, dataForm);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const deleteInventory = async (id) => {
  try {
    const { data } = await baseUrlInventoryDashboard.delete(`/${id}`);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
