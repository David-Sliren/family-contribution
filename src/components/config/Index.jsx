"use client";

import { PageLayout } from "@/components/ui/layout/PageLayout";
import { parseAsString, useQueryState } from "nuqs";
import { ConfigContacto } from "./ConfigContacto";
import { ConfigPerfil } from "./ConfigPerfil";
import { ConfigSeguridad } from "./ConfigSeguridad";
import { ConfigSidebar } from "./ConfigSidebar";

export const Index = ({ title, subtitle, description }) => {
  const [tab] = useQueryState("tab", parseAsString.withDefault("perfil"));

  function renderPanel() {
    if (tab === "contacto") return <ConfigContacto />;
    if (tab === "seguridad") return <ConfigSeguridad />;
    return <ConfigPerfil />;
  }

  return (
    <PageLayout title={title} subtitle={subtitle} description={description}>
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <ConfigSidebar />
          <div className="flex-1 min-w-0">{renderPanel()}</div>
        </div>
      </section>
    </PageLayout>
  );
};
