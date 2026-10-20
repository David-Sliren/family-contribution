import { z } from "zod";

export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const IMAGE_MAX_SIZE_MB = 3;

const imageFileSchema = z
  .file()
  .min(1, "La imagen no puede estar vacía")
  .max(
    IMAGE_MAX_SIZE_MB * 1024 * 1024,
    `La imagen no debe superar los ${IMAGE_MAX_SIZE_MB} MB`,
  )
  .mime(IMAGE_MIME_TYPES, "Formato no permitido, usa JPG, PNG o WebP");

export const fileImage = z.object({
  file: imageFileSchema,
  folder: z.string(),
});

export const fileImageFronted = z.object({
  file: imageFileSchema,
});
