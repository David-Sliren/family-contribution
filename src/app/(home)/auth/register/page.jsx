import { Index } from "@/components/auth/register/Register";

export const metadata = {
  title: "Crear cuenta",
  description:
    "Regístrate en Aleida y empieza a aportar al fondo de tu familia con transparencia.",
  alternates: {
    canonical: "/auth/register",
  },
};

export default function Register() {
  return (
    <div className=" bg-gradient-to-tl from-primary/40 to-primary-container/80 flex items-center justify-center h-full md:min-h-dvh w-full py-12 px-4">
      <Index />
    </div>
  );
}
