import { authClient } from "./auth-client";

export async function handleSingInProvaider(name = "", callBackUrl = "") {
  try {
    const { error } = await authClient.signIn.social({
      provider: name.toLowerCase(),
      callbackURL: callBackUrl,
    });
    if (error) return error;
  } catch (e) {
    throw e;
  }
}
