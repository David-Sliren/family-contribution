import axios from "axios";
import { getBaseUrl } from "../config";

export const baseUrlDashborad = axios.create({
  baseURL: `${getBaseUrl()}/api/dashboard/patients`,
});
export const baseUrlMain = axios.create({
  baseURL: `${getBaseUrl()}/api/main-patient`,
});
