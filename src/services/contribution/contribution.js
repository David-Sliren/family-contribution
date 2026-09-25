import { baseUrlContribution, baseUrlContributionDashboard } from "./config";
import { getServiceError } from "../error";

export const getAllContribution = async (queryParams) => {
  const queries = {};

  if (queryParams.purpose) queries.purpose = queryParams.purpose;
  if (queryParams.method) queries.method = queryParams.method;
  if (queryParams.status) queries.status = queryParams.status;
  if (queryParams.page) queries.page = queryParams.page;
  if (queryParams.limit) queries.limit = queryParams.limit;

  const querys = new URLSearchParams(queries).toString();
  const enpoint = querys.length ? `/?${querys}` : "/";

  try {
    const { data } = await baseUrlContribution.get(enpoint);
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
