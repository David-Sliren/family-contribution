import { Users } from "@/models/user";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search");
  const role = searchParams.get("role");
  const relationship = searchParams.get("relationship");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const paginate = { page: 1, limit: 10 };
  const query = {};

  if (page) paginate.page = page;
  if (limit) paginate.limit = limit;

  if (search)
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
    ];

  if (role) query.role = role;
  if (relationship) query.relationship = relationship;

  try {
    const users = await Users.getAll(query, paginate);

    return Response.json(users);
  } catch (error) {
    if (error.code === "NOT_FOUND_USERS") {
      return Response.json({ message: error.message }, { status: 404 });
    }

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
