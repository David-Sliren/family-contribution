import { payment } from "@/constants/payment";
import { Contribute } from "@/models/contribution";
import { contributionSchemaBanckend } from "@/schemas/contribution";

export const POST = async (req) => {
  const body = await req.json();
  if (body.type !== "payment") return Response.json({ ok: true });

  const payId = body?.data.id;
  if (!payId) return Response.json({ ok: true });

  const pay = await payment.get({ id: payId });

  let userId, purpose;

  try {
    const extrernalRef = JSON.parse(pay.external_reference || "{}");
    userId = extrernalRef.userId;
    purpose = extrernalRef.purpose;
  } catch {
    return Response.json({ ok: true });
  }

  if (pay.status !== "approved") return Response.json({ ok: true });

  const data = {
    paymentId: payId,
    method: "pasarela",
    userId,
    amount: pay.transaction_amount,
    status: "confirmado",
    purpose,
    date: new Date(pay.date_approved).toISOString(),
  };

  const result = contributionSchemaBanckend.safeParse(data);

  if (!result.success) {
    console.error({
      error: result.error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      })),
    });

    return Response.json({ ok: true });
  }

  try {
    await Contribute.create(result.data);
    return Response.json({ ok: true });
  } catch (error) {
    if (error.code === 11000) {
      console.log(`webhook: dupicate payment, already registered ${payId}`);
      return Response.json({ ok: true });
    }

    console.error("webhook: error", error);
    return Response.json({ ok: false }, { status: 500 });
  }
};
