import axios from "axios";

export const baseUrls = axios.create({ baseURL: "/api/payment" });
