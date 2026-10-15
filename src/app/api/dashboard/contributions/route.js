import { Contribute } from "@/models/contribution";
import { Patients } from "@/models/patient";
import { contributionSchemaBanckend } from "@/schemas/contribution";
import { getSession } from "@/utils/getUserData";

export const POST = async (req) => {
  const session = await getSession();

  if (!session)
    return Response.json({ error: "Token invalid" }, { status: 401 });

  if (session.user.role !== "admin")
    return Response.json({ error: "user unauthorized" }, { status: 403 });

  const body = await req.json();

  // solo el admin usa esta ruta, para cualquier usuario (incluso el mismo);
  // los usuarios normales aportan a su nombre unicamente por la pasarela de pago
  if (!body.createBy)
    return Response.json(
      { error: "createBy is required" },
      { status: 400 },
    );

  const { data: patients } = await Patients.getAll();
  const mainPatient = patients.find((patient) => patient.isMain) ?? patients[0];

  if (!mainPatient)
    return Response.json(
      { error: "no hay pacientes registrados" },
      { status: 400 },
    );

  const fullData = {
    ...body,
    patientId: mainPatient.id,
    updateBy: session.user.id,
  };

  const result = contributionSchemaBanckend.safeParse(fullData);

  if (!result.success)
    return Response.json(
      {
        data: result.error.issues.map((e) => ({
          path: e.path,
          error: e.message,
        })),
      },
      { status: 400 },
    );

  try {
    const newContribution = await Contribute.create(result.data);

    return Response.json(newContribution, { status: 201 });
  } catch (error) {
    if (error.code === "USER_UNAUTHORIZED")
      return Response.json({ error: error.message }, { status: 401 });

    if (error.code === "CANT_CONTRIBUTE")
      return Response.json({ error: error.message }, { status: 400 });

    return Response.json({ error: "server error" }, { status: 500 });
  }
};
