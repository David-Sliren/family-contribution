import { Contribution } from "@/database/contribution";
import { Contribute } from "@/models/contribution";
import { contributionSchema } from "@/schemas/contribution";

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

  const result = contributionSchema.safeParse(body);

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
      return Response.json({ message: error.message }, { status: 401 });

    if (error.code === "CANT_CONTRIBUTE")
      return Response.json({ message: error.message }, { status: 400 });

    console.log("unexpected error: ", error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
};
