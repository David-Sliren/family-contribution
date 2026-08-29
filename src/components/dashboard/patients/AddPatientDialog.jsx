"use client";

import { useEffect, useRef, useState } from "react";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { useHookForm } from "@/hooks/useHookForm";
import { patientSchemaFrontend } from "@/schemas/patient";
import { DialogAdd } from "@/components/ui/dialogs/DialogAdd";
import { useCreatePatient } from "@/hooks/tanstack/mutation/useMutationPatient";
import { ButtonVariant } from "@/components/ui/buttons/ButtonVariant";
import { useNotification } from "@/store/ui/notifications";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";

export function AddPatientDialog() {
  const dialogRef = useRef(null);

  // notification
  const setNotification = useNotification((state) => state.setNotification);
  const [errorName, setErrorName] = useState("");

  // tanstack
  const { data: mainPatient } = useMainPatientQuery();
  const { mutateAsync, isSuccess } = useCreatePatient();

  // form
  const { handleSubmit, register, errors, reset } = useHookForm({
    schema: patientSchemaFrontend,
  });

  useEffect(() => {
    if (isSuccess) dialogRef.current?.close();
  }, [isSuccess]);

  async function handleSubmitForm(data) {
    try {
      await mutateAsync(data);
      setNotification({ message: "Se creo un paciente" });
      reset();
    } catch (error) {
      setErrorName(error);
    }
  }

  return (
    <>
      <ButtonVariant
        className={{ hidden: mainPatient?.name }}
        variant="primary"
        commandfor="add-modal"
        command="show-modal"
      >
        Añadir paciente
      </ButtonVariant>
      <DialogAdd
        idModal="add-modal"
        title="Añadir paciente"
        description="Crea un paciente para empezar a conocer el registro de sus progreos."
        inputName="Añadir paciente"
        modalRef={dialogRef}
        handdleFormMain={handleSubmit(handleSubmitForm)}
        errorNotification={errorName}
      >
        <div className="flex flex-col flex-wrap md:flex-row gap-2">
          <FieldType
            name="Nombre"
            inputName="name"
            inputPlaceholder="Ej. juan david"
            inputType="text"
            registerHook={register}
            error={errors}
          />

          <FieldType
            name="Apellido"
            inputName="lastName"
            inputPlaceholder="Ej. perez"
            inputType="text"
            registerHook={register}
            error={errors}
          />
          <FieldType
            name="Edad"
            inputName="age"
            inputPlaceholder="Ej. 60"
            inputType="number"
            registerHook={register}
            error={errors}
          />
          <FieldType
            name="Enfermera/Persona al cuidado"
            inputName="carerName"
            inputPlaceholder="Ej. guillerma"
            inputType="text"
            registerHook={register}
            error={errors}
          />
          <FieldType
            name="Clinica/Hospital a cargo"
            inputName="clinicName"
            inputPlaceholder="Ej. santa barbara"
            inputType="text"
            registerHook={register}
            error={errors}
          />
          <FieldType
            name="Meta"
            inputName="goal"
            inputPlaceholder="Ej. 200000"
            inputType="number"
            registerHook={register}
            error={errors}
          />
        </div>

        <div className="flex flex-col gap-2">
          <FieldType
            name="Razon"
            inputName="reason"
            inputPlaceholder="Ej. Colaboremos todos por un mejor..."
            inputType="text"
            registerHook={register}
            error={errors}
          />

          <FieldType
            name="decripcion"
            inputName="description"
            inputPlaceholder="Ej. Pensemos en devolver todo lo que..."
            inputType="text"
            registerHook={register}
            error={errors}
          />
        </div>
      </DialogAdd>
    </>
  );
}
