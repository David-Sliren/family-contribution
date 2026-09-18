import { baseUrlUser } from "./config";
import { getServiceError } from "../error";

export const getAllUsers = async () => {
  try {
    const { data } = await baseUrlUser.get("/");
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const getById = async (id) => {
  try {
    const { data } = await baseUrlUser.get(`/${id}`);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
