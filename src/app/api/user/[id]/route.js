import { Users } from "@/models/user";

export const GET = async (_req, { params }) => {
  const { id } = await params;

  try {
    const user = await Users.getById(id);

    return Response.json(user);
  } catch (error) {
    if (error.code === "INVALID_ID") {
      return Response.json({ message: error.message }, { status: 400 });
    }

    if (error.code === "NOT_FOUND_USER") {
      return Response.json({ message: error.message }, { status: 404 });
    }

    console.log("unexpected error: ", error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
