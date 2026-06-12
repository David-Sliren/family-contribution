import { User } from "@/database/user";
import { conectToData } from "@/utils/db";

export const GET = async (req) => {
  await conectToData();

  const users = await User.find({});

  return Response.json(users);
};
