import { baseUrlAuth } from "./config";
import { getServiceError } from "../error";

export const createUser = async (userData) => {
  try {
    const { data } = await baseUrlAuth.post("/register", userData);

    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const loginUser = async (userData) => {
  try {
    const { data } = await baseUrlAuth.post("/login", userData);

    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await baseUrlAuth.post("/logout");
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
