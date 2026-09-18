import { TOKEN } from "@/constants/config";
import { SECRET } from "@/constants/env";
import { Expenses } from "@/models/expense";
import { expenseUpdateSchema } from "@/schemas/expense";
import { jwtVerify } from "jose";

export const DELETE = async (req, { params }) => {
  const { id } = await params;
  const token = req.cookies.get(TOKEN);

  if (!token) return Response.json({ error: "Token invalid" }, { status: 401 });

  let userId;

  try {
    const { payload } = await jwtVerify(token.value, SECRET);

    userId = payload.id;
  } catch (error) {
    return Response.json({ error: "user unauthorized" }, { status: 401 });
  }

  try {
    const expense = await Expenses.delete({ id, userId });
    return Response.json(expense);
  } catch (error) {
    if (error.code === "INVALID_ID") {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    if (error.code === "NOT_FOUND_EXPENSE") {
      return Response.json(error.message, { status: 404 });
    }

    console.log("unexpected error: ", error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  const body = await req.json();
  const { id } = await params;
  const token = req.cookies.get(TOKEN);

  if (!token) return Response.json({ error: "Token invalid" }, { status: 401 });

  let userId;

  try {
    const { payload } = await jwtVerify(token.value, SECRET);

    userId = payload.id;
  } catch (error) {
    return Response.json({ error: "user unauthorized" }, { status: 401 });
  }

  const fullData = { ...body, updateBy: userId };

  const result = expenseUpdateSchema.safeParse(fullData);

  if (!result.success)
    return Response.json(
      result.error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      })),
      { status: 400 },
    );

  try {
    const expense = await Expenses.update(id, result.data);
    return Response.json(expense);
  } catch (error) {
    if (error.code === "INVALID_ID" || error.code === "CANT_UPDATE_EXPENSE") {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    if (error.code === "NOT_FOUND_MEDICINE") {
      return Response.json(error.message, { status: 404 });
    }

    console.log("unexpected error: ", error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
