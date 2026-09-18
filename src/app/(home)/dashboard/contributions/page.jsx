import { Index } from "@/components/dashboard/contributions/Index";

export default async function ContributionDashboard({ searchParams }) {
  const params = await searchParams;

  const metadata = {
    title: "Contribuciones",
    subtitle: "Registro de contribuciones",
    description:
      "Consulta las contribuciones registradas por cada usuario y actualiza sus datos para mantener el historial financiero al día.",
  };

  return (
    <Index
      title={metadata.title}
      subtitle={metadata.subtitle}
      description={metadata.description}
    />
  );
}
