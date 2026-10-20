import { baseUrlMain, baseUrlDashborad } from "./config";
import { getServiceError } from "../error";

export const getMainPatient = async () => {
  try {
    const { data } = await baseUrlMain.get("/");
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const getAllPatients = async (queryParams = {}) => {
  const queries = {};

  if (queryParams.search) queries.search = queryParams.search;
  if (queryParams.page) queries.page = queryParams.page;
  if (queryParams.limit) queries.limit = queryParams.limit;

  const querys = new URLSearchParams(queries).toString();
  const enpoint = querys.length ? `/?${querys}` : "/";

  try {
    const { data } = await baseUrlDashborad.get(enpoint);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const createPatient = async (patientData) => {
  try {
    const { data } = await baseUrlDashborad.post("/", patientData);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const updatePatient = async (id, patientData) => {
  try {
    const { data } = await baseUrlDashborad.put(`/${id}`, patientData);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const setMainPatient = async (id) => {
  try {
    const { data } = await baseUrlDashborad.put(`/${id}/main`);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
