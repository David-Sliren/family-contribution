import { cookies } from "next/headers";

export const POST = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");

  return Response.json({ message: "succes logout" });
};
