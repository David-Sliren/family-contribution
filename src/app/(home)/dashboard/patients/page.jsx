import { Index } from "@/components/dashboard/patients/Index";

const metadata = {
  title: "Pacientes",
  subtitle: "Registro de pacientes",
  description: "pendiente.",
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
