import { baseUrlContribution } from "./config";

export const getAllContribution = async () => {
  try {
    const { data } = await baseUrlContribution.get("/");
    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
};

export const createContribution = async (contributionData) => {
  try {
    const { data } = await baseUrlContribution.post("/", contributionData);
    return data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};
