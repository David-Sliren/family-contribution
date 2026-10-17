import { Index } from "@/components/auth/reset-password/ResetPassword";

export const metadata = {
  title: "Restablecer contraseña",
  description:
    "Elige una nueva contraseña para tu cuenta en Aleida | Contribucion",
};

export default async function ResetPassword({ searchParams }) {
  const { token = "", error = "" } = await searchParams;

  return (
    <div className=" bg-gradient-to-tl from-primary/40 to-primary-container/80 flex items-center justify-center h-full min-h-dvh w-full py-12 px-4">
      <Index token={token} error={error} />
    </div>
  );
}
