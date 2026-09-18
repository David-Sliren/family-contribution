"use client";

import { useEffect, useRef, useState } from "react";
import { DialogAdd } from "@/components/ui/dialogs/DialogAdd";
import { FieldHidden } from "@/components/ui/form/inputs/FieldHidden";
import { FieldSelect } from "@/components/ui/form/inputs/FieldSelect";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { useHookForm } from "@/hooks/useHookForm";
import { useCreateInventory } from "@/hooks/tanstack/mutation/useMutationInventory";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import {
  inventoryCategory,
  inventorySchemaFrontend,
  inventoryStatus,
} from "@/schemas/inventory";
import { useNotification } from "@/store/ui/notifications";

export function AddInventoryDialog() {
  const dialogRef = useRef(null);
  const [errorName, setErrorName] = useState("");
  const setNotification = useNotification((state) => state.setNotification);
  const { data: patientData } = useMainPatientQuery();
  const { mutateAsync, isSuccess } = useCreateInventory();
  const { handleSubmit, register, errors, reset } = useHookForm({
    schema: inventorySchemaFrontend,
  });

  useEffect(() => {
    if (isSuccess) dialogRef.current?.close();
  }, [isSuccess]);

  async function handleSubmitForm(data) {
    setErrorName("");
    try {
      await mutateAsync(data);
      setNotification({ message: "Artículo añadido al inventario" });
      reset();
    } catch (error) {
      setErrorName(error);
    }
  }

  return (
    <DialogAdd
      idModal="add-inventory"
      title="Añadir artículo"
      description="Registra un medicamento, suplemento o suministro del tratamiento."
      inputName="Añadir artículo"
      handdleFormMain={handleSubmit(handleSubmitForm)}
      errorNotification={errorName}
      modalRef={dialogRef}
    >
      <FieldHidden
        name={`${patientData?.name ?? ""} ${patientData?.lastName ?? ""}`}
        inputName="patientId"
        defaultValue={patientData?.id}
        registerHook={register}
        error={errors}
        className="hidden"
      />
      <div className="flex flex-col flex-wrap gap-2 md:flex-row">
        <FieldType
          name="Nombre"
          inputName="name"
          inputPlaceholder="Ej. Losartán"
          registerHook={register}
          error={errors}
        />
        <FieldType
          name="Concentración"
          inputName="concentration"
          inputPlaceholder="Ej. 50 mg"
          registerHook={register}
          error={errors}
        />
        <FieldSelect
          name="Categoría"
          inputName="category"
          fieldValues={inventoryCategory.options}
          registerHook={register}
        />
        <FieldSelect
          name="Estado"
          inputName="status"
          fieldValues={inventoryStatus.options}
          registerHook={register}
        />
        <FieldType
          name="Unidades"
          inputName="totalUnit"
          inputType="number"
          inputPlaceholder="Ej. 20"
          registerHook={register}
          error={errors}
        />
        <FieldType
          name="Precio"
          inputName="price"
          inputType="number"
          inputPlaceholder="Ej. 20000"
          registerHook={register}
          error={errors}
        />
      </div>
      <FieldType
        name="Descripción"
        inputName="description"
        inputPlaceholder="Notas del artículo"
        registerHook={register}
        error={errors}
      />
    </DialogAdd>
  );
}
