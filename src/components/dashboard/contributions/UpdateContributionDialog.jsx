"use client";

import { useEffect, useState } from "react";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { useHookForm } from "@/hooks/useHookForm";
import { patientSchemaFrontend } from "@/schemas/patient";
import { DialogAdd } from "@/components/ui/dialogs/DialogAdd";
import { useNotification } from "@/store/ui/notifications";
import { useUpdateUserContribution } from "@/hooks/tanstack/mutation/useMutationContribution";
import { FieldSelect } from "@/components/ui/form/inputs/FieldSelect";
import { FieldHidden } from "@/components/ui/form/inputs/FieldHidden";
import {
  contributionSchemaFrontend,
  contributionSchemaFrontendDashboard,
} from "@/schemas/contribution.frontend";

export function UpdateContributionDialog({ contribution, dialogRef }) {
  // notification
  const setNotification = useNotification((state) => state.setNotification);
  const [errorName, setErrorName] = useState("");

  // tanstack
  const { mutateAsync, isSuccess } = useUpdateUserContribution(
    contribution?.id,
  );

  // form
  const { handleSubmit, register, errors, reset } = useHookForm({
    schema: contributionSchemaFrontendDashboard,
  });

  useEffect(() => {
    if (contribution)
      reset({
        ...contribution,
        userId: contribution?.userId?.id,
      });
  }, [contribution, reset]);

  useEffect(() => {
    if (isSuccess) dialogRef.current?.close();
  }, [isSuccess, dialogRef]);

  async function handleSubmitForm(data) {
    try {
      await mutateAsync(data);
      setNotification({ message: "Se actualizo la contribución" });
      reset();
    } catch (error) {
      setErrorName(error);
    }
  }

  return (
    <>
      <DialogAdd
        idModal="update-contribution"
        title="Actualizar contribucion"
        description={`Estas actualizando la contribucion de ${contribution?.userId?.name}`}
        inputName="Actualizar"
        handdleFormMain={handleSubmit(handleSubmitForm)}
        errorNotification={errorName}
        modalRef={dialogRef}
      >
        <div className="flex flex-col flex-wrap md:flex-row gap-2">
          <div className="space-y-1 absolute top-2 left-2 w-fit">
            <FieldHidden
              name="id"
              inputName="id"
              inputType="text"
              registerHook={register}
              error={errors}
              defaultValue={contribution?.id}
              className="relative top-0 left-0 w-fit opacity-50"
            />
            <FieldHidden
              name="usuario"
              inputName="userId"
              inputType="text"
              registerHook={register}
              error={errors}
              defaultValue={contribution?.userId?.id}
              className="relative top-0 left-0 w-fit opacity-50"
            />
          </div>
          <FieldType
            name="Cantidad"
            inputName="amount"
            inputPlaceholder="Ej. 40000"
            inputType="number"
            registerHook={register}
            error={errors}
          />
          <FieldSelect
            name="Metodo de pago"
            inputName="method"
            fieldValues={["efectivo", "transferencia"]}
            registerHook={register}
          />
        </div>

        <div className="flex flex-col gap-2">
          <FieldSelect
            name="Proposito"
            inputName="purpose"
            fieldValues={["medicinas", "facturas", "cuidador"]}
            registerHook={register}
          />

          <FieldSelect
            name="Estado"
            inputName="status"
            fieldValues={["confirmado", "pendiente"]}
            registerHook={register}
          />
        </div>
      </DialogAdd>
    </>
  );
}
