import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { mongooseAdapter } from "better-auth-mongoose";
import mongoose from "mongoose";
import { conectToData } from "@/utils/mongoose-helper/db";
import "@/database/user";
import { PREFIXTOKEN } from "@/constants/config";

await conectToData();

export const auth = betterAuth({
  database: mongooseAdapter(mongoose.connection, {
    adoptExistingModels: true, // adopta tu modelo "User" y lo extiende
  }),
  user: {
    modelName: "User",
    additionalFields: {
      tel: { type: "string", required: true },
      relationship: { type: "string", required: true },
      role: { type: "string", defaultValue: "user", input: false },
    },
  },
  emailAndPassword: { enabled: true },

  advanced: {
    cookiePrefix: PREFIXTOKEN,
  },
  plugins: [username()],
});
