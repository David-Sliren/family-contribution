"use client";

import { useEffect, useState } from "react";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { useHookForm } from "@/hooks/useHookForm";
import { patientSchemaFrontend } from "@/schemas/patient";
import { DialogAdd } from "@/components/ui/dialogs/DialogAdd";
import { useUpdatePatient } from "@/hooks/tanstack/mutation/useMutationPatient";
import { useNotification } from "@/store/ui/notifications";

export function UpdatePatientDialog({ patient, dialogRef }) {
  // notification
  const setNotification = useNotification((state) => state.setNotification);
  const [errorName, setErrorName] = useState("");

  // tanstack
  const { mutateAsync, isSuccess } = useUpdatePatient(patient.id);

  // form
  const { handleSubmit, register, errors, reset } = useHookForm({
    schema: patientSchemaFrontend,
  });

  useEffect(() => {
    if (patient) reset(patient);
  }, [patient, reset]);

  useEffect(() => {
    if (isSuccess) dialogRef.current?.close();
  }, [isSuccess, dialogRef]);

  async function handleSubmitForm(data) {
    try {
      await mutateAsync(data);
      setNotification({ message: "Se actualizo un paciente" });
      reset();
    } catch (error) {
      setErrorName(error);
    }
  }

  return (
    <>
      <DialogAdd
        idModal="update-patiente"
        title="Actualizar paciente"
        inputName="Actualizar paciente"
        handdleFormMain={handleSubmit(handleSubmitForm)}
        errorNotification={errorName}
        modalRef={dialogRef}
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
