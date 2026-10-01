import { Users } from "@/models/user";
import { getSession } from "@/utils/getUserData";

export const GET = async () => {
  const session = await getSession();

  if (!session)
    return Response.json({ error: "Token invalid" }, { status: 401 });

  try {
    const user = await Users.getById(session.user.id);

    return Response.json(user);
  } catch (error) {
    if (error.code === "INVALID_ID") {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (error.code === "NOT_FOUND_USER") {
      return Response.json({ error: error.message }, { status: 404 });
    }

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
