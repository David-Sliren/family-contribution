import axios from "axios";
import { getBaseUrl } from "../config";

export const baseUrlAuth = axios.create({
  baseURL: `/api/auth/`,
});
export const baseUrlUser = axios.create({
  baseURL: `${getBaseUrl()}/api/users`,
});
export const baseUrlUserDashboard = axios.create({
  baseURL: `${getBaseUrl()}/api/dashboard/users`,
});

// baseUrlAuth.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       useUserStore.getState().logout();
//       window.location.href = "/";
//     }

//     return Promise.reject(error);
//   },
// );
