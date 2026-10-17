"use client";
import { ActionsButtons } from "@/components/ui/form/buttons/ActionsButtons";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { FormLayout } from "@/components/ui/form/layout/FormLayout";
import { Info } from "@/components/ui/form/info/Info";
import React, { useState } from "react";
import { useHookForm } from "@/hooks/useHookForm";
import { forgotPasswordSchema } from "@/schemas/login";
import { authClient } from "@/utils/auth-client";

export const Index = () => {
  const [errorName, setErrorName] = useState("");
  const [sentTo, setSentTo] = useState("");
  const { handleSubmit, register, errors, isSubmitting } = useHookForm({
    schema: forgotPasswordSchema,
  });

  async function handleSubmitForm(data) {
    try {
      setErrorName("");
      // better-auth responde siempre igual si el correo existe o no
      // (anti-enumeración); redirectTo es relativo a este origin
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/auth/reset-password",
      });

      if (error) {
        return setErrorName(
          error.message || "No se pudo solicitar el enlace, intente nuevamente",
        );
      }

      setSentTo(data.email);
    } catch (e) {
      setErrorName("No se pudo conectar con el servidor, intente nuevamente");
    }
  }

  if (sentTo) {
    return (
      <FormLayout title="Revisa tu correo">
        <p className="text-on-surface-variant text-sm font-body leading-relaxed">
          Si existe una cuenta con{" "}
          <strong className="text-on-surface">{sentTo}</strong>, recibirás un
          enlace para restablecer tu contraseña. Revisa también la carpeta de
          spam.
        </p>
        <Info
          text="¿Ya tienes el enlace?"
          linkName="Iniciar sesion"
          url="/auth/login"
        />
      </FormLayout>
    );
  }

  return (
    <FormLayout
      title="Recuperar contraseña"
      errorNotification={errorName}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <p className="text-on-surface-variant text-sm font-body leading-relaxed">
          Escribe el correo de tu cuenta y te enviaremos un enlace para cambiar
          la contraseña.
        </p>

        <FieldType
          name="Correo electrónico"
          inputName="email"
          inputPlaceholder="Ej. correo@correo.com"
          inputType="email"
          registerHook={register}
          error={errors}
        />

        <ActionsButtons
          buttonName="Enviar enlace"
          isSubmitting={isSubmitting}
        />
      </form>

      <Info
        text="¿Recordaste tu contraseña?"
        linkName="Iniciar sesion"
        url="/auth/login"
      />
    </FormLayout>
  );
};
