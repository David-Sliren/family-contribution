import { Index } from "@/components/auth/forgot-password/ForgotPassword";

export const metadata = {
  title: "Recuperar contraseña",
  description:
    "Solicita un enlace para restablecer tu contraseña en Aleida | Contribucion",
};

export default function ForgotPassword() {
  return (
    <div className=" bg-gradient-to-tl from-primary/40 to-primary-container/80 flex items-center justify-center h-full min-h-dvh w-full py-12 px-4">
      <Index />
    </div>
  );
}
