import { TOKEN } from "@/constants/config";
import { Contribution } from "@/database/contribution";
import { conectToData } from "@/utils/mongoose-helper/db";
import { cookies } from "next/headers";

export const GET = async () => {
  await conectToData();
  const cookiestore = await cookies();
  try {
    await Contribution.deleteMany({});

    cookiestore.delete(TOKEN);
    return Response.json(
      { message: "delete many contributions" },
      { status: 201 },
    );
  } catch (e) {
    console.log(e.message);
  }
};
