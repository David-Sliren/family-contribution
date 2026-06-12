import { TOKEN } from "@/constants/config";
import { SECRET } from "@/constants/env";
import { User } from "@/database/user";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getUserData = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN);

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token.value, SECRET);

    const user = await User.findById(payload.id);

    return user ? user?.toJSON() : null;
  } catch {
    return null;
  }
};
