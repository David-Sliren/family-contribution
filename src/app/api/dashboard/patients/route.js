import { Patients } from "@/models/patient";
import { patientSchema } from "@/schemas/patient";
import { getSession } from "@/utils/getUserData";

export const GET = async (_req) => {
  try {
    const patient = await Patients.getAll();

    return Response.json(patient);
  } catch (error) {
    if (error.code === "NOT_FOUND_PATIENTS") {
      return Response.json({ error: error.message }, { status: 404 });
    }

    console.log("unexpected error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};

export const POST = async (req) => {
  const body = await req.json();

  const session = await getSession();

  if (!session)
    return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const fullData = { ...body, createBy: session.user.id };

  const result = patientSchema.safeParse(fullData);

  if (!result.success)
    return Response.json(
      result.error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      })),
      { status: 400 },
    );

  try {
    const patient = await Patients.create(result.data);

    return Response.json(patient, { status: 201 });
  } catch (error) {
    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    if (error.code === "CANT_CREATE_PATIENT") {
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.log("unexpected error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
