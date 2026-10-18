import { Index } from "@/components/contribute/Index";

export const metadata = {
  title: "Contribuir",
  description:
    "Haz tu aporte al fondo familiar por transferencia Nequi o con tarjeta a través de Mercado Pago, de forma segura.",
  alternates: {
    canonical: "/contribute",
  },
};

export default function Contribute() {
  return (
    <div className="bg-gradient-to-tl from-primary/40 to-primary-container/80 flex items-center justify-center h-full min-h-dvh w-full py-12 px-4">
      <Index />
    </div>
  );
}
