import { useUserStore } from "@/components/provaider/AuthProvider";
import axios from "axios";

export const baseUrlAuth = axios.create({ baseURL: "/api/auth/" });

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
