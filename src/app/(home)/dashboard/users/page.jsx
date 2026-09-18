import { Index } from "@/components/dashboard/users/Index";

export default async function UsersDashboard({ searchParams }) {
  const params = await searchParams;

  const metadata = {
    title: "Usuarios",
    subtitle: "Registro de usuarios",
    description:
      "Consulta los usuarios registrados, sus roles y el total de sus aportes; también puedes registrar nuevas contribuciones para cada uno.",
  };

  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
