import { Inventories } from "@/models/inventory";
import { inventoryUpdateSchema } from "@/schemas/inventory";
import { getSession } from "@/utils/getUserData";

export const DELETE = async (_req, { params }) => {
  const session = await getSession();

  if (!session)
    return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const { id } = await params;

  try {
    const inventory = await Inventories.delete({
      id,
      userId: session.user.id,
    });
    return Response.json(inventory);
  } catch (error) {
    if (error.code === "INVALID_ID") {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    if (error.code === "NOT_FOUND_INVENTORY") {
      return Response.json(error.message, { status: 404 });
    }

    console.log("unexpected error: ", error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  const session = await getSession();

  if (!session)
    return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const body = await req.json();
  const { id } = await params;

  const fullData = { ...body, updateBy: session.user.id };

  const result = inventoryUpdateSchema.safeParse(fullData);

  if (!result.success)
    return Response.json(
      result.error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      })),
      { status: 400 },
    );

  try {
    const inventory = await Inventories.update(id, result.data);
    return Response.json(inventory);
  } catch (error) {
    if (error.code === "INVALID_ID" || error.code === "CANT_UPDATE_INVENTORY") {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    if (error.code === "NOT_FOUND_INVENTORY") {
      return Response.json(error.message, { status: 404 });
    }

    console.log("unexpected error: ", error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
