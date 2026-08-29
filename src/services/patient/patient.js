import { baseUrlMain, baseUrlDashborad } from "./config";

export const getMainPatient = async () => {
  try {
    const { data } = await baseUrlMain.get("/");
    return data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const getAllPatients = async () => {
  try {
    const { data } = await baseUrlDashborad.get("/");
    return data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const createPatient = async (patientData) => {
  try {
    const { data } = await baseUrlDashborad.post("/", patientData);
    return data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const updatePatient = async (id, patientData) => {
  try {
    const { data } = await baseUrlDashborad.put(`/${id}`, patientData);
    return data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};
