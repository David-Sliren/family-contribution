import { Contribute } from "@/models/contribution";

export const GET = async (_req, { params }) => {
  const { id } = await params;
  try {
    const contribution = await Contribute.getById(id);

    return Response.json(contribution);
  } catch (error) {
    if (error.code === "INVALID_ID")
      return Response.json({ message: error.message }, { status: 400 });

    if (error.code === "NOT_FOUND_CONTRIBUTION")
      return Response.json({ message: error.message }, { status: 400 });

    console.error("unexpected error", error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
};
