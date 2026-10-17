"use client";

import { LuCopy, LuKeyRound, LuPhone } from "react-icons/lu";
import { useNotification } from "@/store/ui/notifications";

/*
  Panel de la opcion "transferencia": muestra el telefono (Nequi) y la clave
  transacional (Bre-B) del paciente principal con su descripcion y boton copiar.
  Es informativo: no registra la contribucion (eso lo hace la pasarela de pago).
*/
export const TransferPanel = ({ patient }) => {
  const setNotification = useNotification((state) => state.setNotification);

  async function copyValue(value, label) {
    try {
      await navigator.clipboard.writeText(value);
      setNotification({ message: "Copiado al portapapeles" });
    } catch {
      setNotification({
        message: `No se pudo copiar ${label.toLowerCase()}`,
        type: "error",
      });
    }
  }

  const fields = [
    {
      id: "tel",
      Icon: LuPhone,
      title: "Teléfono (Nequi)",
      description: "Contribuye usando Nequi a este número",
      value: patient?.tel || "",
    },
    {
      id: "keyT",
      Icon: LuKeyRound,
      title: "Clave transacional (Bre-B)",
      description: "Contribuye usando la clave Bre-B",
      value: patient?.keyT || "",
    },
  ];

  return (
    <div className="flex flex-col gap-3 mt-4 animate-fade-in-down">
      {fields.map(({ id, Icon, title, description, value }) => (
        <div
          key={id}
          className="flex items-center justify-between gap-3 rounded-2xl border border-outline-variant bg-surface-container-lowest p-4"
        >
          <div className="min-w-0">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-on-surface font-body">
              <Icon className="text-primary" />
              {title}
            </span>
            <p className="text-[12px] text-on-surface-variant font-body mt-1 mb-0">
              {description}
            </p>
            <p className="text-[15px] font-semibold text-primary font-body mt-1.5 mb-0 break-all">
              {value || "No configurado"}
            </p>
          </div>
          {value && (
            <button
              type="button"
              title={`Copiar ${title.toLowerCase()}`}
              className="cursor-pointer p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low shrink-0"
              onClick={() => copyValue(value, title)}
            >
              <LuCopy />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
