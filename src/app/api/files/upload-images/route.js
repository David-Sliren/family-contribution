import {
  CLOUDINARY_APY_KEY,
  CLOUDINARY_APY_SECRECT,
  CLOUDINARY_CLOUD_NAME,
} from "@/constants/env";
import { FOLDER_IMAGES } from "@/constants/sizes";
import { fileImage } from "@/schemas/file";
import { v2 as cloudinaryBase } from "cloudinary";

cloudinaryBase.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_APY_KEY,
  api_secret: CLOUDINARY_APY_SECRECT,
});

export const POST = async (req) => {
  const formData = await req.formData();

  const parsed = fileImage.safeParse({
    file: formData.get("file"),
    folder: formData.get("folder") || FOLDER_IMAGES[0].name,
  });

  if (!parsed.success) {
    return Response.json(
      { error: "the form data is invalid" },
      { status: 400 },
    );
  }

  const { file } = parsed.data;
  const folder = `family-contribution/${parsed.data.folder}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const res = await new Promise((resolve, reject) => {
      cloudinaryBase.uploader
        .upload_stream({ folder }, (error, res) => {
          if (error || !res) return reject(error);

          resolve(res);
        })
        .end(buffer);
    });

    const url = cloudinaryBase.url(res.public_id, {
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
        {
          width: folder.includes(FOLDER_IMAGES[0].name)
            ? FOLDER_IMAGES[0].with
            : FOLDER_IMAGES[1].with,
          height: folder.includes(FOLDER_IMAGES[0].name)
            ? FOLDER_IMAGES[0].height
            : FOLDER_IMAGES[1].height,
          crop: "fill",
          gravity: "auto",
        },
      ],
    });

    return Response.json({ url });
  } catch (error) {
    return Response.json(
      { error: "there was an error uploading the image" },
      { status: 500 },
    );
  }
};
