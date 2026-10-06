import { Contribute } from "@/models/contribution";
import { Patients } from "@/models/patient";
import { contributionSchemaBanckend } from "@/schemas/contribution";
import { getSession } from "@/utils/getUserData";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const purpose = searchParams.get("purpose");
  const method = searchParams.get("method");
  const status = searchParams.get("status");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const paginate = { page: 1, limit: 10 };
  const query = {};

  if (page) paginate.page = page;
  if (limit) paginate.limit = limit;

  if (purpose) query.purpose = purpose;
  if (method) query.method = method;
  if (status) query.status = status;

  try {
    const contributions = await Contribute.getAll(query, paginate);

    return Response.json(contributions);
  } catch (error) {
    if (error.code === "NOT_FOUND_CONTRIBUTIONS")
      return Response.json({ message: error.message }, { status: 404 });

    return Response.json({ error: "server error" }, { status: 500 });
  }
};

export const POST = async (req) => {
  const session = await getSession();

  if (!session)
    return Response.json({ error: "Token invalid" }, { status: 401 });

  const body = await req.json();

  const patients = await Patients.getAll();
  const mainPatient = patients.find((patient) => patient.isMain) ?? patients[0];

  if (!mainPatient)
    return Response.json(
      { error: "no hay pacientes registrados" },
      { status: 400 },
    );

  const fullData = {
    ...body,
    createBy: session.user.id,
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
