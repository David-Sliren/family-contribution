"use client";

import { useEffect, useRef, useState } from "react";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { useHookForm } from "@/hooks/useHookForm";
import { DialogAdd } from "@/components/ui/dialogs/DialogAdd";
import { useNotification } from "@/store/ui/notifications";
import { FieldSelect } from "@/components/ui/form/inputs/FieldSelect";
import { FieldHidden } from "@/components/ui/form/inputs/FieldHidden";
import { useCreateExpense } from "@/hooks/tanstack/mutation/useMutationExpense";
import {
  expenseCategory,
  expenseCurrency,
  expenseSchemaFrontend,
} from "@/schemas/expense";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";

export function AddExpenseDialog() {
  // notification
  const setNotification = useNotification((state) => state.setNotification);
  const [errorName, setErrorName] = useState("");

  const dialogRef = useRef(null);

  // tanstack
  const { mutateAsync, isSuccess } = useCreateExpense();
  const { data: patientData } = useMainPatientQuery();

  // form
  const { handleSubmit, register, errors, reset } = useHookForm({
    schema: expenseSchemaFrontend,
  });

  useEffect(() => {
    if (isSuccess) dialogRef.current?.close();
  }, [isSuccess, dialogRef]);

  async function handleSubmitForm(data) {
    setErrorName("");

    try {
      await mutateAsync(data);
      setNotification({ message: "Gasto añadido" });
      reset();
    } catch (error) {
      setErrorName(error);
    }
  }

  return (
    <>
      <DialogAdd
        idModal="add-expense"
        title="Añadir gasto"
        description={`Estas añadiendo un gasto a la lista de gastos. Por favor, completa el formulario y haz click en "Añadir gasto" para continuar.`}
        inputName="Añadir gasto"
        handdleFormMain={handleSubmit(handleSubmitForm)}
        errorNotification={errorName}
        modalRef={dialogRef}
      >
        <div className="flex flex-col flex-wrap md:flex-row gap-2">
          <FieldHidden
            name={`${patientData?.name} ${patientData?.lastName}`}
            inputName="patientId"
            defaultValue={patientData?.id}
            error={errors}
            registerHook={register}
            className="hidden sm:block"
          />
          <FieldType
            name="Nombre"
            inputName="name"
            inputPlaceholder="Ej. Acetaminofen 500mg x 20"
            inputType="text"
            registerHook={register}
            error={errors}
          />
          <FieldSelect
            name="Categoria"
            inputName="category"
            fieldValues={expenseCategory.options}
            registerHook={register}
          />

          <FieldType
            name="Cantidad"
            inputName="amount"
            inputPlaceholder="Ej. 200000"
            inputType="number"
            registerHook={register}
            error={errors}
          />
          <FieldSelect
            name="Moneda"
            inputName="currency"
            fieldValues={expenseCurrency.options}
            registerHook={register}
          />
        </div>

        <FieldType
          name="Descripción"
          inputName="description"
          inputPlaceholder="Ej. se compro acetaminofen para..."
          inputType="text"
          registerHook={register}
          error={errors}
        />
      </DialogAdd>
    </>
  );
}
