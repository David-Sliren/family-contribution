import { Index } from "@/components/auth/verify-email/VerifyEmail";

export const metadata = {
  title: "Verificar correo",
  description:
    "Confirmación del correo electrónico para activar tu cuenta en Aleida | Contribucion",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VerifyEmail({ searchParams }) {
  const { error = "" } = await searchParams;

  return (
    <div className=" bg-gradient-to-tl from-primary/40 to-primary-container/80 flex items-center justify-center h-full min-h-dvh w-full py-12 px-4">
      <Index error={error} />
    </div>
  );
}
