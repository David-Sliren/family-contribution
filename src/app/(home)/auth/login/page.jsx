import { Index } from "@/components/auth/login/Login";

export const metadata = {
  title: "Iniciar sesión",
  description:
    "Accede a tu cuenta de Aleida para consultar aportes, gastos e inventario de tu familia.",
  alternates: {
    canonical: "/auth/login",
  },
};

export default function Login() {
  return (
    <div className=" bg-gradient-to-tl from-primary/40 to-primary-container/80 flex items-center justify-center h-full min-h-dvh w-full py-12 px-4">
      <Index />
    </div>
  );
}
