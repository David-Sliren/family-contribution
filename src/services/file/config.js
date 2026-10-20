import axios from "axios";
import { getBaseUrl } from "../config";

export const baseUrlFile = axios.create({
  baseURL: `${getBaseUrl()}/api/files`,
});
