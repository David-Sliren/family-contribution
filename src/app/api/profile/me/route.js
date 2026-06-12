import { SECRET } from "@/constants/env";
import { User } from "@/database/user";
import { getUserData } from "@/utils/getUserData";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const GET = async () => {
  const user = await getUserData();

  if (!user)
    return Response.json({ message: "unauthorizated" }, { status: 401 });

  return Response.json(user);
};
