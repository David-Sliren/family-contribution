import { baseUrlExpenses, baseUrlExpensesDashboard } from "./config";
import { getServiceError } from "../error";

export const getAllExpenses = async (queryParams) => {
  const queries = {};

  if (queryParams.category) queries.category = queryParams.category;
  if (queryParams.search) queries.search = queryParams.search;
  if (queryParams.page) queries.page = queryParams.page;
  if (queryParams.limit) queries.limit = queryParams.limit;

  const querys = new URLSearchParams(queries).toString();
  const enpoint = querys.length ? `/?${querys}` : "/";

  try {
    const { data } = await baseUrlExpenses.get(enpoint);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const createExpense = async (dataForm) => {
  try {
    const { data } = await baseUrlExpensesDashboard.post("/", dataForm);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const updateExpense = async (id, dataForm) => {
  try {
    const { data } = await baseUrlExpensesDashboard.put(`/${id}`, dataForm);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const deleteExpense = async (id) => {
  try {
    const { data } = await baseUrlExpensesDashboard.delete(`/${id}`);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
