import { PaymentCheckout } from "@/models/payments/mercadoPago";
import { contributionSchemaFrontend } from "@/schemas/contribution.frontend";
import { getSession } from "@/utils/getUserData";

export const POST = async (req) => {
  const session = await getSession();

  if (!session)
    return Response.json({ error: "Token invalid" }, { status: 401 });


  const body = await req.json();

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
      session.user.id,
      result.data.purpose,
      result.data.amount,
    );

    return Response.json({ init_point: pay?.init_point, id: pay?.id });
  } catch (error) {
    console.log("error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
