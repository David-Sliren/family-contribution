import { baseUrlInventory, baseUrlInventoryDashboard } from "./config";
import { getServiceError } from "../error";

export const getAllInventory = async () => {
  try {
    const { data } = await baseUrlInventory.get("/");
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const createInventory = async (dataForm) => {
  try {
    const { data } = await baseUrlInventoryDashboard.post("/", dataForm);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const updateInventory = async (id, dataForm) => {
  try {
    const { data } = await baseUrlInventoryDashboard.put(`/${id}`, dataForm);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};

export const deleteInventory = async (id) => {
  try {
    const { data } = await baseUrlInventoryDashboard.delete(`/${id}`);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
