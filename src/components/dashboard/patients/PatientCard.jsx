"use client";

import { formatMoney } from "@/config/money";
import { blurColors } from "@/constants/bgBase64";
import { Card } from "@/components/ui/cards/Card";
import { Chip } from "@/components/dashboard/ui/chips/Chip";
import { DeafultPopover } from "@/components/ui/popovers/DeafultPopover";
import { useNotification } from "@/store/ui/notifications";
import { useSetMainPatient } from "@/hooks/tanstack/mutation/useMutationPatient";
import Image from "next/image";
import { LuCrown, LuEllipsisVertical, LuImage, LuPencil } from "react-icons/lu";

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

      <div className="flex items-center justify-between mt-5">
        <Chip tone={patient.isMain ? "success" : "neutral"}>
          {patient.isMain ? "principal" : "secundario"}
        </Chip>
        <span className="text-[11px] text-on-surface-variant font-body">
          meta {formatMoney(patient.goal)}
        </span>
      </div>

      <DeafultPopover id={patient.id}>
        <button
          className="flex w-full items-center gap-3 px-4 py-2 text-primary hover:bg-surface-container-low cursor-pointer"
          onClick={() => onEdit(patient)}
        >
          <LuPencil />
          Editar
        </button>
        <button
          className="flex w-full items-center gap-3 px-4 py-2 text-primary hover:bg-surface-container-low cursor-pointer"
          onClick={() => onChangeImage(patient)}
        >
          <LuImage />
          Cambiar foto
        </button>
        {!patient.isMain && (
          <button
            className="flex w-full items-center gap-3 px-4 py-2 text-primary hover:bg-surface-container-low cursor-pointer"
            onClick={handleSetMain}
          >
            <LuCrown />
            Hacer principal
          </button>
        )}
      </DeafultPopover>
    </Card>
  );
}
