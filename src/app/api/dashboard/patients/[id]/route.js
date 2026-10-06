import { Patients } from "@/models/patient";
import { patientUpdateSchema } from "@/schemas/patient";
import { getSession } from "@/utils/getUserData";

export const GET = async (_req, { params }) => {
  const session = await getSession();

  if (!session) return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const { id } = await params;
  try {
    const patient = await Patients.getById(id);

    return Response.json(patient);
  } catch (error) {
    if (error.code === "INVALID_ID") {
      return Response.json(error.message, { status: 400 });
    }

    if (error.code === "NOT_FOUND_PATIENT") {
      return Response.json(error.message, { status: 404 });
    }

    console.log("unexpected error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  const session = await getSession();

  if (!session) return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const body = await req.json();
  const { id } = await params;

  const result = patientUpdateSchema.safeParse(body);

  if (!result.success)
    return Response.json(
      result.error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      })),
      { status: 400 },
    );

  try {
    const updatePatient = await Patients.update(id, {
      ...result.data,
      updateBy: session.user.id,
    });

    return Response.json(updatePatient, { status: 201 });
  } catch (error) {
    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    if (error.code === "INVALID_ID" || error.code === "CANT_UPDATE_PATIENT") {
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.log("unexpected error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};

export const DELETE = async (_req, { params }) => {
  const session = await getSession();

  if (!session) return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const { id } = await params;

  try {
    const deletePatient = await Patients.delete({ id, userId: session.user.id });
    return Response.json(deletePatient);
  } catch (error) {
    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    if (error.code === "INVALID_ID") {
      return Response.json(error.message, { status: 400 });
    }

    if (error.code === "NOT_FOUND_PATIENT") {
      return Response.json(error.message, { status: 404 });
    }

    console.log("unexpected error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
