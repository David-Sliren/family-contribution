"use client";

import { useEffect, useState } from "react";
import { DialogAdd } from "@/components/ui/dialogs/DialogAdd";
import { FieldSelect } from "@/components/ui/form/inputs/FieldSelect";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { useHookForm } from "@/hooks/useHookForm";
import { useUpdateInventory } from "@/hooks/tanstack/mutation/useMutationInventory";
import { inventoryCategory, inventorySchemaFrontend, inventoryStatus } from "@/schemas/inventory";
import { useNotification } from "@/store/ui/notifications";

export function UpdateInventoryDialog({ inventory, dialogRef }) {
  const [errorName, setErrorName] = useState("");
  const setNotification = useNotification((state) => state.setNotification);
  const { mutateAsync, isSuccess } = useUpdateInventory(inventory?.id);
  const { handleSubmit, register, errors, reset } = useHookForm({ schema: inventorySchemaFrontend });

  useEffect(() => {
    if (inventory) reset(inventory);
  }, [inventory, reset]);

  useEffect(() => {
    if (isSuccess) dialogRef.current?.close();
  }, [dialogRef, isSuccess]);

  async function handleSubmitForm(data) {
    setErrorName("");
    try {
      await mutateAsync(data);
      setNotification({ message: "Artículo actualizado" });
    } catch (error) {
      setErrorName(error);
    }
  }

  return (
    <DialogAdd idModal="update-inventory" title="Actualizar artículo" description="Actualiza la información y el estado de existencias." inputName="Actualizar artículo" handdleFormMain={handleSubmit(handleSubmitForm)} errorNotification={errorName} modalRef={dialogRef}>
      <div className="flex flex-col flex-wrap gap-2 md:flex-row">
        <FieldType name="Nombre" inputName="name" registerHook={register} error={errors} />
        <FieldType name="Concentración" inputName="concentration" registerHook={register} error={errors} />
        <FieldSelect name="Categoría" inputName="category" fieldValues={inventoryCategory.options} registerHook={register} />
        <FieldSelect name="Estado" inputName="status" fieldValues={inventoryStatus.options} registerHook={register} />
        <FieldType name="Unidades" inputName="totalUnit" inputType="number" registerHook={register} error={errors} />
        <FieldType name="Precio" inputName="price" inputType="number" registerHook={register} error={errors} />
      </div>
      <FieldType name="Descripción" inputName="description" registerHook={register} error={errors} />
    </DialogAdd>
  );
}
