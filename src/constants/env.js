// Public
export const ANALYTICS = process.env.NEXT_PUBLIC_GA_ID;

// Private
export const SECRET = new TextEncoder().encode(process.env.SECRET_JWT);
export const MONGODB_URI = process.env.MONGODB_URI;
export const ACCESSTOKEN = process.env.MP_ACCESS_TOKEN;
export const PORT = process.env.PORT || 3000;
const VERCEL_URL =
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`;
export const BASE_URL = process.env.BASE_URL || VERCEL_URL;
console.info("BASE_URL: ", BASE_URL);

if (!/^https?:\/\/.+/.test(BASE_URL)) {
  throw new Error(`BASE_URL inválida: "${BASE_URL}"`);
}
