import { Events } from "@/models/event";
import { Patients } from "@/models/patient";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const type = searchParams.get("type");
  const patientId = searchParams.get("patientId");

  const paginate = {
    page: 1,
    limit: 6,
  };

  const query = {};

  if (page) paginate.page = page;
  if (limit) paginate.limit = limit;
  if (type) query.type = type;

  if (patientId) {
    if (patientId !== "all") query.patientId = patientId;
  } else {
    const main = await Patients.getMain();
    if (main) query.patientId = main._id;
  }

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
