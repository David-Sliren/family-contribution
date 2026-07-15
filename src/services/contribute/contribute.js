import { baseUrls } from "./config";

export const createPreference = async (dataForm) => {
  try {
    const response = await baseUrls.post("/preference", dataForm);
    return response.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};
