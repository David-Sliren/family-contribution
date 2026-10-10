import { FormLayout } from "@/components/ui/form/layout/FormLayout";
import { LuContact } from "react-icons/lu";

export const ConfigContacto = () => {
  return (
    <FormLayout title="Contacto">
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <LuContact className="text-primary" size={32} strokeWidth={1.5} />
        <p className="text-sm text-on-surface-variant">
          Esta sección estará disponible próximamente.
        </p>
      </div>
    </FormLayout>
  );
};
