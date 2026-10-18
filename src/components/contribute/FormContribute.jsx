"use client";
import { useHookForm } from "@/hooks/useHookForm";
import { FormLayout } from "../ui/form/layout/FormLayout";
import { FieldType } from "../ui/form/inputs/FieldType";
import { ActionsButtons } from "../ui/form/buttons/ActionsButtons";
import { contributionSchemaFrontend } from "@/schemas/contribution.frontend";
import { FieldSelect } from "../ui/form/inputs/FieldSelect";
import { createPreference } from "@/services/contribute/contribute";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import { useEffect, useState } from "react";
import { TransferPanel } from "./TransferPanel";
import { LuArrowLeftRight } from "react-icons/lu";
import { cn } from "@/utils/cn";

const METHODS = [
  {
    id: "transferencia",
    Icon: LuArrowLeftRight,
    title: "Transferencia",
    description: (name) =>
      `Transfiere directamente desde tu banco o Nequi a los datos de ${name} y apoya el tratamiento.`,
  },
  /*{
    id: "pasarela",
    Icon: LuCreditCard,
    title: "Pasarela de pago",
    description: () =>
      "Paga de forma segura con tarjeta, PSE u otros medios mediante Mercado Pago.",
  },*/
];

export const FormContribute = () => {
  const [errorname, setErrorName] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [method, setMethod] = useState("");
  const { data: patient } = useMainPatientQuery();
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

  const patientName = patient?.name || "Aleida";

  return (
    <FormLayout
      title="Gracias por la ayuda"
      errorNotification={errorname}
      className="min-w-full shadow-md"
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
        {METHODS.map(({ id, Icon, title, description }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMethod(id)}
            className={cn(
              "text-left rounded-2xl border p-4 cursor-pointer transition-colors",
              method === id
                ? "border-primary bg-primary/10"
                : "border-outline-variant bg-surface-container-low hover:border-primary/50",
            )}
          >
            <span className="flex items-center gap-2 font-display text-on-surface">
              <Icon className="text-primary" />
              {title}
            </span>
            <span className="block mt-1 text-[12px] leading-snug text-on-surface-variant font-body">
              {description(patientName)}
            </span>
          </button>
        ))}
      </div>

      {method === "transferencia" && <TransferPanel patient={patient} />}

      {method === "pasarela" && (
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="space-y-4 mt-4"
        >
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
      )}
    </FormLayout>
  );
};
