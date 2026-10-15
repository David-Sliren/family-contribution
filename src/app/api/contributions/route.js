import { Contribute } from "@/models/contribution";

// NOTE: el POST de contribuciones vive en /api/dashboard/contributions
// (solo admin). Los usuarios aportan a su nombre unicamente por la
// pasarela de pago (webhook -> Contribute.create).

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const purpose = searchParams.get("purpose");
  const method = searchParams.get("method");
  const status = searchParams.get("status");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const paginate = { page: 1, limit: 10 };
  const query = {};

  if (page) paginate.page = page;
  if (limit) paginate.limit = limit;

  if (purpose) query.purpose = purpose;
  if (method) query.method = method;
  if (status) query.status = status;

  try {
    const contributions = await Contribute.getAll(query, paginate);

    return Response.json(contributions);
  } catch (error) {
    if (error.code === "NOT_FOUND_CONTRIBUTIONS")
      return Response.json({ message: error.message }, { status: 404 });

    return Response.json({ error: "server error" }, { status: 500 });
  }
};
