"use client";

import { formatMoney } from "@/config/money";
import { blurColors } from "@/constants/bgBase64";
import { Card } from "@/components/ui/cards/Card";
import { Chip } from "@/components/dashboard/ui/chips/Chip";
import { DeafultPopover } from "@/components/ui/popovers/DeafultPopover";
import { useNotification } from "@/store/ui/notifications";
import { useSetMainPatient } from "@/hooks/tanstack/mutation/useMutationPatient";
import Image from "next/image";
import {
  LuCopy,
  LuCrown,
  LuEllipsisVertical,
  LuImage,
  LuKeyRound,
  LuPencil,
  LuPhone,
} from "react-icons/lu";
import { ButtonPop } from "@/components/ui/buttons/ButtonPop";

export function PatientCard({ patient, onEdit, onChangeImage }) {
  const setNotification = useNotification((state) => state.setNotification);
  const { mutateAsync } = useSetMainPatient();

  async function handleSetMain() {
    try {
      await mutateAsync(patient.id);
      setNotification({ message: `${patient.name} es el paciente principal` });
    } catch (error) {
      setNotification({
        message: error || "No se pudo cambiar el paciente principal",
        type: "error",
      });
    }
  }

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

  return (
    <Card className="p-5">
      <div className="flex justify-between items-start gap-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {patient.image ? (
              <Image
                src={patient.image}
                alt={patient.name || "paciente"}
                width={200}
                height={200}
                placeholder="blur"
                blurDataURL={blurColors.purple}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold capitalize">
                {patient.name?.[0] ?? "i"}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-[17px] font-display tracking-tight text-on-surface m-0 truncate">
              {patient.name || "indefinido"} {patient.lastName || ""}
            </h3>
            <p className="text-[12px] text-on-surface-variant font-body mt-1 mb-0">
              {patient.age} años • {patient.clinicName || "clínica indefinida"}
            </p>
          </div>
        </div>
        <button
          popoverTarget={`popover-basic-${patient.id}`}
          className="cursor-pointer p-1 text-on-surface-variant hover:text-primary"
        >
          <LuEllipsisVertical />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[12px] text-on-surface-variant font-body">
            <LuPhone className="text-base" />
            Teléfono (Nequi)
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <span className="text-[12px] text-on-surface font-body truncate">
              {patient.tel || "—"}
            </span>
            {patient.tel && (
              <button
                className="cursor-pointer p-1 text-on-surface-variant hover:text-primary"
                title="Copiar teléfono"
                onClick={() => copyValue(patient.tel, "Teléfono")}
              >
                <LuCopy />
              </button>
            )}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[12px] text-on-surface-variant font-body">
            <LuKeyRound className="text-base" />
            Clave transacional (Bre-B)
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <span className="text-[12px] text-on-surface font-body truncate">
              {patient.keyT || "—"}
            </span>
            {patient.keyT && (
              <button
                className="cursor-pointer p-1 text-on-surface-variant hover:text-primary"
                title="Copiar clave transacional"
                onClick={() => copyValue(patient.keyT, "Clave transacional")}
              >
                <LuCopy />
              </button>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <Chip tone={patient.isMain ? "success" : "neutral"}>
          {patient.isMain ? "principal" : "secundario"}
        </Chip>
        <span className="text-[11px] text-on-surface-variant font-body">
          meta {formatMoney(patient.goal)}
        </span>
      </div>

      <DeafultPopover id={patient.id}>
        <ButtonPop
          name="editar"
          icon={LuPencil}
          handle={() => onEdit(patient)}
        />
        <ButtonPop
          name="cambiar foto"
          icon={LuImage}
          handle={() => onChangeImage(patient)}
        >
          <LuImage />
          Cambiar foto
        </ButtonPop>
        {!patient.isMain && (
          <ButtonPop
            name="Hacer principal"
            icon={LuCrown}
            handle={handleSetMain}
          />
        )}
      </DeafultPopover>
    </Card>
  );
}
