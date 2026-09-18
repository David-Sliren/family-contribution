import { TOKEN } from "@/constants/config";
import { SECRET } from "@/constants/env";
import { Patients } from "@/models/patient";
import { patientSchema } from "@/schemas/patient";
import { jwtVerify } from "jose";

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

  const token = req.cookies.get(TOKEN);
  if (!token) return Response.json({ error: "Token invalid" }, { status: 401 });

  let userId;

  try {
    const { payload } = await jwtVerify(token.value, SECRET);
    userId = payload.id;
  } catch (error) {
    return Response.json({ error: "user unauthorized" }, { status: 401 });
  }
  const fullData = { ...body, userId };

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
