import { Users } from "@/models/user";

export const GET = async (_req) => {
  try {
    const users = await Users.getAll();

    return Response.json(users);
  } catch (error) {
    if (error.code === "NOT_FOUND_USERS") {
      return Response.json({ message: error.message }, { status: 404 });
    }

    console.log("unexpected error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
