import { Contribute } from "@/models/contribution";
import { contributionUpdateSchema } from "@/schemas/contribution";
import { getSession } from "@/utils/getUserData";

export const PUT = async (req, { params }) => {
  const session = await getSession();

  if (!session)
    return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();

  const fullData = { ...body, updateBy: session.user.id };

  const result = contributionUpdateSchema.safeParse(fullData);

  if (!result.success)
    return Response.json(
      {
        data: result.error.issues.map((e) => ({
          path: e.path,
          message: e.message,
        })),
      },
      { status: 400 },
    );

  try {
    const updatedContribution = await Contribute.update(id, result.data);

    return Response.json(updatedContribution);
  } catch (error) {
    if (error.code === "INVALID_ID")
      return Response.json({ message: error.message }, { status: 400 });

    if (error.code === "NOT_FOUND_CONTRIBUTION")
      return Response.json({ message: error.message }, { status: 400 });

    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    console.error("unexpected error", error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
};
