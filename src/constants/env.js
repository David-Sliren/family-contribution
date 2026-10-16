// Public
export const ANALYTICS = process.env.NEXT_PUBLIC_GA_ID;

// Private
export const MONGODB_URI = process.env.MONGODB_URI;
export const ACCESSTOKEN_MP = process.env.MP_ACCESS_TOKEN;
export const PORT = process.env.PORT || 3000;
export const VERCEL_URL =
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`;
export const BASE_URL = process.env.BASE_URL || VERCEL_URL;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_APY_KEY = process.env.CLOUDINARY_APY_KEY;
export const CLOUDINARY_APY_SECRECT = process.env.CLOUDINARY_APY_SECRECT;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
