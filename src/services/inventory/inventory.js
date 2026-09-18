import { baseUrlInventory, baseUrlInventoryDashboard } from "./config";

const getError = (error) => error?.response?.data?.error || error?.message;

export const getAllInventory = async () => {
  try {
    const { data } = await baseUrlInventory.get("/");
    return data;
  } catch (error) {
    throw getError(error);
  }
};

export const createInventory = async (dataForm) => {
  try {
    const { data } = await baseUrlInventoryDashboard.post("/", dataForm);
    return data;
  } catch (error) {
    console.log("error: ", error?.response?.data);
    throw getError(error);
  }
};

export const updateInventory = async (id, dataForm) => {
  try {
    const { data } = await baseUrlInventoryDashboard.put(`/${id}`, dataForm);
    return data;
  } catch (error) {
    throw getError(error);
  }
};

export const deleteInventory = async (id) => {
  try {
    const { data } = await baseUrlInventoryDashboard.delete(`/${id}`);
    return data;
  } catch (error) {
    throw getError(error);
  }
};
