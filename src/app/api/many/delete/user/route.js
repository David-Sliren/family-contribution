import { TOKEN } from "@/constants/config";
import { User } from "@/database/user";
import { conectToData } from "@/utils/mongoose-helper/db";
import { cookies } from "next/headers";

export const GET = async () => {
  await conectToData();
  const cookiestore = await cookies();
  try {
    await User.deleteMany({});

    cookiestore.delete(TOKEN);
    return Response.json({ message: "delete many users" }, { status: 201 });
  } catch (e) {
    console.log(e.message);
  }
};
