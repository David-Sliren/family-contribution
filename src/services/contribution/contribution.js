import { baseUrlContribution } from "./config";

export const getAllContribution = async () => {
  try {
    const { data } = await baseUrlContribution.get("/");
    return data;
  } catch (error) {
    console.log("error?.response?.data?.message: ", error);
    // throw error?.response?.data?.message;
    throw error;
  }
};
