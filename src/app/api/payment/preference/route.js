import { TOKEN } from "@/constants/config";
import { SECRET } from "@/constants/env";
import { PaymentCheckout } from "@/models/payments/mercadoPago";
import { contributionSchemaFrontend } from "@/schemas/contribution.frontend";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

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

  const result = contributionSchemaFrontend.safeParse(body);

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
    const pay = await PaymentCheckout.createContribution(
      userId,
      result.data.purpose,
      result.data.amount,
    );

    return Response.json({ init_point: pay?.init_point, id: pay?.id });
  } catch (error) {
    console.log("error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
