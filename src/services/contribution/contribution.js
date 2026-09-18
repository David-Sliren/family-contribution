import { baseUrlContribution, baseUrlContributionDashboard } from "./config";
import { getServiceError } from "../error";

export const getAllContribution = async () => {
  try {
    const { data } = await baseUrlContribution.get("/");
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const createContribution = async (contributionData) => {
  try {
    const { data } = await baseUrlContribution.post("/", contributionData);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const updateContribution = async (id, contributionData) => {
  try {
    const { data } = await baseUrlContributionDashboard.put(
      `/${id}`,
      contributionData,
    );
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
