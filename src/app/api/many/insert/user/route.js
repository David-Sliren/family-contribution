import { TOKEN } from "@/constants/config";
import { Contribution } from "@/database/contribution";
import { User } from "@/database/user";
import { conectToData } from "@/utils/mongoose-helper/db";
import { cookies } from "next/headers";

export const GET = async () => {
  await conectToData();
  const cookiestore = await cookies();
  try {
    await Contribution.deleteMany({});
    await User.deleteMany({});

    cookiestore.delete(TOKEN);
    return Response.json({ message: "delete many" }, { status: 201 });
  } catch (e) {
    console.log(e.message);
  }
};
