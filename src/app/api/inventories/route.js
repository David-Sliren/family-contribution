import { Inventories } from "@/models/inventory";
import { Patients } from "@/models/patient";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get("status");
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

  // paginate
  if (page) paginate.page = page;
  if (limit) paginate.limit = limit;

  // query
  if (category) query.category = category;
  if (status) query.status = status;
  if (search) query.name = { $regex: search, $options: "i" };

  if (patientId) {
    if (patientId !== "all") query.patientId = patientId;
  } else {
    const main = await Patients.getMain();
    if (main) query.patientId = main._id;
  }

  try {
    const inventory = await Inventories.getAll(query, paginate);
    return Response.json(inventory);
  } catch (error) {
    if (error.code === "NOT_FOUND_INVENTORY") {
      return Response.json({ error: error.message }, { status: 404 });
    }

    console.log("unexpected error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
