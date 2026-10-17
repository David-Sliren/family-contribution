import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { mongooseAdapter } from "better-auth-mongoose";
import mongoose from "mongoose";
import { conectToData } from "@/utils/mongoose-helper/db";
import "@/database/user";
import { PREFIXTOKEN } from "@/constants/config";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/constants/env";
import { sendEmail } from "@/utils/email";

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
  emailAndPassword: {
    enabled: true,
    // el registro queda bloqueado hasta que el usuario confirme su correo
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        toEmail: user.email,
        subject: "Recupera tu contraseña",
        template: {
          title: "Recupera tu contraseña",
          message:
            "Recibimos una solicitud para cambiar la contraseña de tu cuenta. Haz clic en el botón para elegir una nueva; si no fuiste tú, puedes ignorar este correo.",
          userName: user.name,
          buttonText: "Restablecer contraseña",
          buttonUrl: url,
          note: "Este enlace caduca en 1 hora",
        },
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        toEmail: user.email,
        subject: "Verifica tu correo electrónico",
        template: {
          title: "Verifica tu correo",
          message:
            "Ya casi eres parte de la familia. Haz clic en el botón para confirmar tu correo electrónico y activar tu cuenta.",
          userName: user.name,
          buttonText: "Verificar mi correo",
          buttonUrl: url,
          note: "Este enlace caduca en 1 hora",
        },
      });
    },
  },

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
