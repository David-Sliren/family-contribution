import { Patients } from "@/models/patient";

export const GET = async (_req) => {
  try {
    const main = await Patients.getMain();

    if (!main) return Response.json({});

    const mainpatient = await Patients.getById(main._id || main.id);

    return Response.json(mainpatient.toJSON());
  } catch (error) {
    if (error.code === "NOT_FOUND_PATIENT") {
      return Response.json(error.message, { status: 404 });
    }

    console.log("unexpected error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
