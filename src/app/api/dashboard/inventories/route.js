import { TOKEN } from "@/constants/config";
import { SECRET } from "@/constants/env";
import { Inventories } from "@/models/inventory";
import { inventorySchema } from "@/schemas/inventory";
import { jwtVerify } from "jose";

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
  const fullData = { ...body, createBy: userId, updateBy: userId };

  const result = inventorySchema.safeParse(fullData);

  if (!result.success)
    return Response.json(
      result.error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      })),
      { status: 400 },
    );

  try {
    const medicine = await Inventories.create(result.data);
    return Response.json(medicine, { status: 201 });
  } catch (error) {
    if (error.code === "CANT_CREATE_MEDICINE") {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    if (error.code === "PATIENT_NOT_FOUND") {
      return Response.json({ error: error.message }, { status: 404 });
    }

    console.log("unexpected error: ", error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
