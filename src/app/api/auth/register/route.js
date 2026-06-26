import { userBackendSchema } from "@/schemas/user";
import { body } from "motion/react-client";
import dat from "@/datas/userData.json";
import { AuthUser } from "@/models/auth";

export const POST = async (req) => {
  const body = await req.json();
  const res = userBackendSchema.safeParse(body);
  if (!res.success)
    return Response.json(
      {
        error: res.error.issues.map((e) => ({
          path: e.path,
          message: e.message,
        })),
      },
      { status: 400 },
    );

  try {
    const data = await AuthUser.create(res.data);
    return Response.json(data);
  } catch (error) {
    if (
      error.code === "DUPLICATED_EMAIL" ||
      error.code === "DUPLICATED_EMAIL"
    ) {
      return Response.json({ error: error.message }, { status: 409 });
    }

    if (error.code === 11000) {
      return Response.json(
        { error: "el nombre de usuario ya está registrado" },
        { status: 400 },
      );
    }

    console.error("error inesperado", error);
    return Response.json(
      { error: "error interno del servidor" },
      { status: 500 },
    );
  }
};
