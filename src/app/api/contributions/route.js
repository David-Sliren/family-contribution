import { TOKEN } from "@/constants/config";
import { SECRET } from "@/constants/env";
import { Contribution } from "@/database/contribution";
import { Contribute } from "@/models/contribution";
import { contributionSchemaBanckend } from "@/schemas/contribution";
import { jwtVerify } from "jose";

export const GET = async () => {
  try {
    const contributions = await Contribute.getAll();

    return Response.json(contributions);
  } catch (error) {
    if (error.code === "NOT_FOUND_CONTRIBUTIONS")
      return Response.json({ message: error.message }, { status: 404 });

    console.log("unexpected error: ", error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const token = req.cookies.get(TOKEN);

  if (!token) return Response.json({ error: "Token invalid" }, { status: 401 });

  let userId;

  try {
    const { payload } = await jwtVerify(token.value, SECRET);

    userId = payload.id;
  } catch (error) {
    return Response.json({ error: "user unauthorized" }, { status: 401 });
  }

  const fullData = { updateBy: userId, ...body };

  const result = contributionSchemaBanckend.safeParse(fullData);

  if (!result.success)
    return Response.json(
      {
        data: result.error.issues.map((e) => ({
          path: e.path,
          error: e.message,
        })),
      },
      { status: 400 },
    );

  if (result.data.amount < 10000) {
    return Response.json({
      error: "the contribuionn must be greater than or equal to 10000",
    });
  }

  try {
    const newContribution = await Contribute.create(result.data);

    return Response.json(newContribution, { status: 201 });
  } catch (error) {
    if (error.code === "USER_UNAUTHORIZED")
      return Response.json({ error: error.message }, { status: 401 });

    if (error.code === "CANT_CONTRIBUTE")
      return Response.json({ error: error.message }, { status: 400 });

    console.log("unexpected error: ", error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
};
