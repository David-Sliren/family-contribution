import axios from "axios";
import { getBaseUrl } from "../config";

export const baseUrlEvents = axios.create({
  baseURL: `${getBaseUrl()}/api/events`,
});
