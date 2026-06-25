import { loginSchema } from "@/schemas/login";
import { AuthUser } from "@/models/auth";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const body = await req.json();

  const result = loginSchema.safeParse(body);

  if (!result.success)
    return Response.json(
      {
        error: result.error.issues.map((e) => ({
          path: e.path,
          message: e.message,
        })),
      },
      { status: 400 },
    );

  try {
    const cookieStore = await cookies();

    const { token } = await AuthUser.login(result.data);

    cookieStore.set("access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2,
      sameSite: "strict",
      path: "/",
    });

    return Response.json({ message: "engoy your sesion" });
  } catch (error) {
    if (
      error.code === "INVALIDATE_USERNAME" ||
      error.code === "INVALIDATE_PASSWORD"
    )
      return Response.json({ error: error.message }, { status: 409 });
  }

  console.error("error inesperado", error);
  return Response.json(
    { error: "error interno del servidor" },
    { status: 500 },
  );
};
