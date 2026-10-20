import { Expenses } from "@/models/expense";
import { Patients } from "@/models/patient";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const patientId = searchParams.get("patientId");

  const paginate = {
    page: 1,
    limit: 10,
  };

  const query = {};

  if (page) paginate.page = page;
  if (limit) paginate.limit = limit;

  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: "i" };

  if (patientId) {
    if (patientId !== "all") query.patientId = patientId;
  } else {
    const main = await Patients.getMain();
    if (main) query.patientId = main._id;
  }

  try {
    const expense = await Expenses.getAll(query, paginate);
    return Response.json(expense);
  } catch (error) {
    if (error.code === "NOT_FOUND_EXPENSES") {
      return Response.json({ error: error.message }, { status: 404 });
    }

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
