import { TOKEN } from "@/constants/config";
import { SECRET } from "@/constants/env";
import { Contribute } from "@/models/contribution";
import { contributionUpdateSchema } from "@/schemas/contribution";
import { jwtVerify } from "jose";

export const PUT = async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  const token = req.cookies.get(TOKEN);

  if (!token) return Response.json({ error: "Token invalid" }, { status: 401 });

  let userId;

  try {
    const { payload } = await jwtVerify(token.value, SECRET);

    userId = payload.id;
  } catch (error) {
    console.log("desde route");
    return Response.json({ error: "user unauthorized" }, { status: 401 });
  }

  const fullData = { ...body, updateBy: userId };

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
