import { baseUrlExpenses, baseUrlExpensesDashboard } from "./config";
import { getServiceError } from "../error";

export const getAllExpenses = async () => {
  try {
    const { data } = await baseUrlExpenses.get("/");
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
