import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { mongooseAdapter } from "better-auth-mongoose";
import mongoose from "mongoose";
import { conectToData } from "@/utils/mongoose-helper/db";
import "@/database/user";
import { PREFIXTOKEN } from "@/constants/config";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/constants/env";

await conectToData();

export const auth = betterAuth({
  database: mongooseAdapter(mongoose.connection, {
    adoptExistingModels: true, // adopta tu modelo "User" y lo extiende
  }),
  user: {
    modelName: "User",
    additionalFields: {
      tel: { type: "string", required: false, defaultValue: "" },
      relationship: { type: "string", defaultValue: "externo" },
      role: { type: "string", defaultValue: "user", input: false },
    },
  },
  emailAndPassword: { enabled: true },

  advanced: {
    cookiePrefix: PREFIXTOKEN,
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [username()],
});
