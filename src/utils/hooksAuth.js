import { User } from "@/database/user";
import { APIError } from "better-auth";

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_.]/g, "")
    .slice(0, 20);

export const beforeRegisterHook = async (user) => {
  if (user.username) return { data: user };

  let base = slugify(user.name || user.email.split("@")[0]);
  if (base.length < 3) base = `user${base}`; // mínimo del plugin: 3

  let candidate = base;
  for (let i = 0; i < 5 && (await User.exists({ username: candidate })); i++) {
    candidate = `${base}${Math.floor(1000 + Math.random() * 9000)}`;
  }

  return {
    data: { ...user, username: candidate, displayUsername: user.name },
  };
};

export const beforeExistEmail = async (ctx) => {
  if (ctx.path !== "/sign-up/email") return;

  const exists = await User.exists({ email: ctx.body.email });

  if (exists) {
    throw new APIError("BAD_REQUEST", {
      message: "user already exist use another email",
      code: "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
    });
  }
};
