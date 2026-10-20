import { Patients } from "@/models/patient";
import { getSession } from "@/utils/getUserData";

export const PUT = async (_req, { params }) => {
  const session = await getSession();

  if (!session) return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const { id } = await params;

  try {
    const patient = await Patients.setMain({
      id,
      updateBy: session.user.id,
    });

    return Response.json(patient);
  } catch (error) {
    if (error.code === "USER_UNAUTHORIZED") {
      return Response.json({ error: error.message }, { status: 401 });
    }

    if (error.code === "INVALID_ID" || error.code === "CANT_UPDATE_PATIENT") {
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.error("unexpected error: ", error);

    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
