"use client";

import { useEffect, useState } from "react";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { useHookForm } from "@/hooks/useHookForm";
import { DialogAdd } from "@/components/ui/dialogs/DialogAdd";
import { useNotification } from "@/store/ui/notifications";
import { FieldSelect } from "@/components/ui/form/inputs/FieldSelect";
import { FieldHidden } from "@/components/ui/form/inputs/FieldHidden";
import { useUpdateExpense } from "@/hooks/tanstack/mutation/useMutationExpense";
import {
  expenseCategory,
  expenseCurrency,
  expenseSchemaFrontend,
} from "@/schemas/expense";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";

export function UpdateExpenseDialog({ expense, dialogRef }) {
  // notification
  const setNotification = useNotification((state) => state.setNotification);
  const [errorName, setErrorName] = useState("");

  // tanstack
  const { mutateAsync, isSuccess } = useUpdateExpense(expense?.id);
  const { data: patientData } = useMainPatientQuery();

  // form
  const { handleSubmit, register, errors, reset } = useHookForm({
    schema: expenseSchemaFrontend,
  });

  useEffect(() => {
    if (expense)
      reset({
        ...expense,
      });
  }, [expense, reset]);

  useEffect(() => {
    if (isSuccess) dialogRef.current?.close();
  }, [isSuccess, dialogRef]);

  async function handleSubmitForm(data) {
    try {
      await mutateAsync(data);
      setNotification({ message: "Gasto actualizado" });
      reset();
    } catch (error) {
      setErrorName(error);
    }
  }

  return (
    <>
      <DialogAdd
        idModal="update-expense"
        title="Actualizar gasto"
        description={`Estas actualizando un gasto de la lista de gastos. Por favor, completa el formulario y haz click en "Actualizar gasto" para continuar.`}
        inputName="Actualizar gasto"
        handdleFormMain={handleSubmit(handleSubmitForm)}
        errorNotification={errorName}
        modalRef={dialogRef}
      >
        <div className="flex flex-col flex-wrap md:flex-row gap-2">
          <div className="space-y-1 absolute top-2 left-2 w-fit">
            <FieldHidden
              name={`${patientData?.name} ${patientData?.lastName}`}
              inputName="patientId"
              defaultValue={patientData?.id}
              error={errors}
              registerHook={register}
              className="hidden sm:block relative top-0 left-0 w-fit opacity-50"
            />

            <FieldHidden
              name="id"
              inputName="createBy"
              defaultValue={expense?.createBy}
              error={errors}
              registerHook={register}
              className="hidden relative top-0 left-0 w-fit opacity-50"
            />

            <FieldHidden
              name="id"
              inputName="id"
              defaultValue={expense?.id}
              error={errors}
              registerHook={register}
              className="hidden sm:block relative top-0 left-0 w-fit opacity-50"
            />
          </div>
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
