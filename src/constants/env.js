// Public
export const ANALYTICS = process.env.NEXT_PUBLIC_GA_ID;

// Private
export const MONGODB_URI = process.env.MONGODB_URI;
export const ACCESSTOKEN_MP = process.env.MP_ACCESS_TOKEN;
export const PORT = process.env.PORT || 3000;
export const VERCEL_URL =
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`;
export const BASE_URL = process.env.BASE_URL || VERCEL_URL;
