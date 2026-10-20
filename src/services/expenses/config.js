import axios from "axios";
import { getBaseUrl } from "../config";

export const baseUrlExpenses = axios.create({
  baseURL: `${getBaseUrl()}/api/expenses`,
});

export const baseUrlExpensesDashboard = axios.create({
  baseURL: `${getBaseUrl()}/api/dashboard/expenses`,
});
