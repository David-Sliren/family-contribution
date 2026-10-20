import { Users } from "@/models/user";
import { userRoleBackendSchema } from "@/schemas/user";
import { getSession } from "@/utils/getUserData";

export const PUT = async (req, { params }) => {
  const session = await getSession();

  if (!session)
    return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const { id } = await params;

  if (id === session.user.id)
    return Response.json(
      { error: "Administrators cannot change their own role" },
      { status: 403 },
    );

  const body = await req.json();
  const result = userRoleBackendSchema.safeParse(body);

  if (!result.success)
    return Response.json(
      {
        error: "Invalid role",
        details: result.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      },
      { status: 400 },
    );

  try {
    const user = await Users.updateRole(id, result.data.role);
    return Response.json(user);
  } catch (error) {
    if (error.code === "INVALID_ID")
      return Response.json({ error: error.message }, { status: 400 });

    if (error.code === "NOT_FOUND_USER")
      return Response.json({ error: error.message }, { status: 404 });

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
