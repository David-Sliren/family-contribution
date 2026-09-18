import { Index } from "@/components/dashboard/patients/Index";

const metadata = {
  title: "Pacientes",
  subtitle: "Registro de pacientes",
  description:
    "Registra a los pacientes de tu familia y mantiene actualizada su información clínica y de contacto.",
};

export default async function PatientsDashboard() {
  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
