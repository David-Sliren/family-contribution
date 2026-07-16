"use client";
import { useHookForm } from "@/hooks/useHookForm";
import { FormLayout } from "../ui/form/layout/FormLayout";
import { FieldType } from "../ui/form/inputs/FieldType";
import { ActionsButtons } from "../ui/form/buttons/ActionsButtons";
import { contributionSchemaFrontend } from "@/schemas/contribution.frontend";
import { FieldSelect } from "../ui/form/inputs/FieldSelect";
import { createPreference } from "@/services/contribute/contribute";
import { useEffect, useState } from "react";

export const FormContribute = () => {
  const [errorname, setErrorName] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(null);
  const { handleSubmit, register, errors, isSubmitting } = useHookForm({
    schema: contributionSchemaFrontend,
    defaultValues: {},
  });

  useEffect(() => {
    if (redirectUrl) window.location.href = redirectUrl;
  }, [redirectUrl]);

  async function handleSubmitForm(data) {
    try {
      const response = await createPreference(data);
      setRedirectUrl(response.init_point);
    } catch (error) {
      setErrorName(error);
    }
  }

  return (
    <FormLayout
      title="Gracias por la ayuda"
      errorNotification={errorname}
      className="min-w-full shadow-md"
    >
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <FieldType
          name="Cantidad"
          inputName="amount"
          inputType="number"
          registerHook={register}
          error={errors}
          inputPlaceholder="Ej. 20000"
          more={{ min: 0 }}
        />
        <FieldSelect
          name="Proposito"
          inputName="purpose"
          registerHook={register}
          fieldValues={["medicinas", "facturas", "cuidador"]}
        />
        <ActionsButtons isSubmitting={isSubmitting} buttonName="Pagar" />
      </form>
    </FormLayout>
  );
};
