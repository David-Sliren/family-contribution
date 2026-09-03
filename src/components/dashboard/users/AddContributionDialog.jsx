"use client";

import { useEffect, useState } from "react";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { useHookForm } from "@/hooks/useHookForm";
import { DialogAdd } from "@/components/ui/dialogs/DialogAdd";
import { useCreateUserContribution } from "@/hooks/tanstack/mutation/useMutationContribution";
import { useNotification } from "@/store/ui/notifications";
import { contributionSchemaFrontendDashboard } from "@/schemas/contribution.frontend";
import { FieldSelect } from "@/components/ui/form/inputs/FieldSelect";
import { FieldHidden } from "@/components/ui/form/inputs/FieldHidden";

export function AddContributionDialog({ user, dialogRef }) {
  console.log("user: ", user.id);
  // notification
  const setNotification = useNotification((state) => state.setNotification);
  const [errorName, setErrorName] = useState("");

  // tanstack
  const { mutateAsync, isSuccess } = useCreateUserContribution(user.id);

  // form
  const { handleSubmit, register, errors, reset } = useHookForm({
    schema: contributionSchemaFrontendDashboard,
  });

  useEffect(() => {
    // console.log("user.id: ", user.id);
    if (user) reset({ userId: user.id });
  }, [reset, user]);

  useEffect(() => {
    if (isSuccess) dialogRef.current?.close();
  }, [isSuccess, dialogRef]);

  async function handleSubmitForm(data) {
    try {
      await mutateAsync(data);
      setNotification({ message: "Contribucion añadida" });
      reset();
    } catch (error) {
      setErrorName(error);
    }
  }

  return (
    <>
      <DialogAdd
        idModal="add-contribution"
        title="Añadir contribucion"
        description={`Estas añadiendo una contribucion a ${user?.name} ${user?.lastName ?? ""}`}
        inputName="Añadir pago"
        handdleFormMain={handleSubmit(handleSubmitForm)}
        errorNotification={errorName}
        modalRef={dialogRef}
      >
        <div className="flex flex-col flex-wrap md:flex-row gap-2">
          <FieldType
            name="Cantidad"
            inputName="amount"
            inputPlaceholder="Ej. 200000"
            inputType="number"
            registerHook={register}
            error={errors}
          />

          <FieldHidden
            name="usuario"
            inputName="userId"
            inputType="text"
            registerHook={register}
            error={errors}
            defaultValue={user.id}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-8">
          <FieldSelect
            name="Proposito"
            inputName="purpose"
            fieldValues={["medicinas", "facturas", "cuidador"]}
            registerHook={register}
          />

          <FieldSelect
            name="Metodo de pago"
            inputName="method"
            fieldValues={["efectivo", "transferencia"]}
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
