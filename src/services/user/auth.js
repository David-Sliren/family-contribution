import axios from "axios";
import { baseUrlAuth } from "./config";

export const createUser = async (userData) => {
  try {
    const { data } = await baseUrlAuth.post("/register", userData);

    return data;
  } catch (e) {
    throw e.response.data.error;
  }
};

export const loginUser = async (userData) => {
  try {
    const { data } = await baseUrlAuth.post("/login", userData);

    return data;
  } catch (e) {
    throw e.response.data.error;
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await baseUrlAuth.post("/logout");
    return data;
  } catch (e) {
    throw e;
  }
};
