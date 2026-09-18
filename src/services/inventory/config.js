import axios from "axios";
import { getBaseUrl } from "../config";

export const baseUrlInventory = axios.create({
  baseURL: `${getBaseUrl()}/api/inventories`,
});

export const baseUrlInventoryDashboard = axios.create({
  baseURL: `${getBaseUrl()}/api/dashboard/inventories`,
});
