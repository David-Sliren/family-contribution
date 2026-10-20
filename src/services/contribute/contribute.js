import { baseUrls } from "./config";
import { getServiceError } from "../error";

export const createPreference = async (dataForm) => {
  try {
    const response = await baseUrls.post("/preference", dataForm);
    return response.data;
  } catch (error) {
    throw getServiceError(error);
  }
};
