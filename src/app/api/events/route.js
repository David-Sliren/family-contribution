import { Events } from "@/models/event";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const type = searchParams.get("type");

  const paginate = {
    page: 1,
    limit: 6,
  };

  const query = {};

  if (page) paginate.page = page;
  if (limit) paginate.limit = limit;
  if (type) query.type = type;

  try {
    const events = await Events.getAll(query, paginate);
    return Response.json(events);
  } catch (error) {
    if (error.code === "NOT_FOUND_EVENTS") {
      return Response.json({ error: error.message }, { status: 404 });
    }

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
