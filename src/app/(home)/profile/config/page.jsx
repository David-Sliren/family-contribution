import { Index } from "@/components/config/Index";

const titleData = {
  title: "Configuración",
  subtitle: "Ajustes de la cuenta",
  description:
    "Actualiza tu información personal, datos de contacto y seguridad.",
};

export default function ConfigPage() {
  return (
    <Index
      title={titleData.title}
      subtitle={titleData.subtitle}
      description={titleData.description}
    />
  );
}
