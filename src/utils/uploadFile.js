import { uploadImage } from "@/services/file/file";

export const uploadFile = async (data) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("folder", data.folder);

  return await uploadImage(formData);
};
