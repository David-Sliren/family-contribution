"use client";
import { ActionsButtons } from "@/components/ui/form/buttons/ActionsButtons";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { FormLayout } from "@/components/ui/form/layout/FormLayout";
import { Info } from "@/components/ui/form/info/Info";
import React, { useState } from "react";
import { useHookForm } from "@/hooks/useHookForm";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/schemas/login";
import { authClient } from "@/utils/auth-client";
import { useNotification } from "@/store/ui/notifications";

const ERRORS = {
  INVALID_TOKEN:
    "El enlace para cambiar la contraseña no es válido o expiró. Solicita uno nuevo.",
};

export const Index = ({ token = "", error = "" }) => {
  const router = useRouter();
  const setNotification = useNotification((state) => state.setNotification);
  const [errorName, setErrorName] = useState("");
  const { handleSubmit, register, errors, isSubmitting } = useHookForm({
    schema: resetPasswordSchema,
  });

  const invalid = Boolean(error) || !token;
  const invalidMessage = error
    ? ERRORS[error] ||
      "No se pudo validar el enlace, solicita uno nuevo intente nuevamente"
    : "Este enlace no es válido. Solicita uno nuevo desde el login.";

  async function handleSubmitForm(data) {
    try {
      setErrorName("");
      const { error: resetError } = await authClient.resetPassword({
        newPassword: data.password,
        token,
      });

      if (resetError) {
        return setErrorName(
          resetError.message ||
            "No se pudo cambiar la contraseña, intente nuevamente",
        );
      }

      setNotification({ message: "Contraseña actualizada, inicia sesion" });
      return router.replace("/auth/login");
    } catch (e) {
      setErrorName("No se pudo conectar con el servidor, intente nuevamente");
    }
  }

  if (invalid) {
    return (
      <FormLayout title="Enlace invalido" errorNotification={invalidMessage}>
        <Info
          text="¿Necesitas otro enlace?"
          linkName="Solicitar uno nuevo"
          url="/auth/forgot-password"
        />
      </FormLayout>
    );
  }

  return (
    <FormLayout title="Nueva contraseña" errorNotification={errorName}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <FieldType
          name="Nueva contraseña"
          inputName="password"
          inputPlaceholder="Ej. Kakoq12nagsNm"
          inputType="password"
          isPassword={true}
          registerHook={register}
          error={errors}
        />
        <FieldType
          name="Confirmar contraseña"
          inputName="confirmPassword"
          inputPlaceholder="Ej. Kakoq12nagsNm"
          inputType="password"
          isPassword={true}
          registerHook={register}
          error={errors}
        />
        <ActionsButtons
          buttonName="Cambiar contraseña"
          isSubmitting={isSubmitting}
        />
      </form>
    </FormLayout>
  );
};
