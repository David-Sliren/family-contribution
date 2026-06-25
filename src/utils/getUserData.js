import { TOKEN } from "@/constants/config";
import { SECRET } from "@/constants/env";
import { Users } from "@/models/user";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getUserData = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN);

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token.value, SECRET);

    const user = await Users.getById(payload.id);

    const userParse = JSON.parse(JSON.stringify(user));

    return user ? { ...userParse, _exp: payload.exp } : null;
  } catch {
    return null;
  }
};
