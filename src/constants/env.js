export const SECRET = new TextEncoder().encode(process.env.SECRET_JWT);
export const MONGODB_URI = process.env.MONGODB_URI;
export const ACCESSTOKEN = process.env.MP_ACCESS_TOKEN;
export const PORT = process.env.PORT || 3000;
export const BASE_URL = process.env.BASE_URL || `localhost:${PORT}`;
