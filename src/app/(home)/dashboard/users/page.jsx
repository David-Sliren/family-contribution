import { Index } from "@/components/dashboard/users/Index";

export default async function UsersDashboard({ searchParams }) {
  const params = await searchParams;

  const metadata = {
    title: "Usuarios",
    subtitle: "Registro de usuarios",
    description: "pendiente.",
  };

  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
