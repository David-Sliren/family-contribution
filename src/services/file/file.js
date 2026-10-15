import { getServiceError } from "../error";
import { baseUrlFile } from "./config";

export const uploadImage = async (dataForm) => {
  try {
    const { data } = await baseUrlFile.post("/upload-images", dataForm);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
