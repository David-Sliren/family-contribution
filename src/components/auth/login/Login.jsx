"use client";
import { ActionsButtons } from "@/components/ui/form/buttons/ActionsButtons";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { FormLayout } from "@/components/ui/form/layout/FormLayout";
import React, { useState } from "react";
import { useHookForm } from "@/hooks/useHookForm";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/login";
import { Info } from "@/components/ui/form/info/Info";
import { useNotification } from "@/store/ui/notifications";
import { authClient } from "@/utils/auth-client";

const DEFAULVALUES = {
  // username: "juanperez01",
  // password: "Noseqponer12",
};

export const Index = () => {
  const router = useRouter();
  const setNotification = useNotification((state) => state.setNotification);
  const [errorName, setErrorName] = useState("");
  const { handleSubmit, register, errors, isSubmitting } = useHookForm({
    schema: loginSchema,
    defaultValues: DEFAULVALUES,
  });

  async function handleSubmitForm(data) {
    const { confirmPassword, ...backendData } = data;
    try {
      const { data, error } = await authClient.signIn.username({
        ...backendData,
      });

      if (!error) {
        setNotification({ message: "Disfrute su sesion" });
        return router.replace("/");
      }

      if (error.code === "INVALID_USERNAME_OR_PASSWORD") {
        return setErrorName(
          "Es incorrecto el nombre de usuario o la contraseña ",
        );
      }

      setErrorName(
        error.message || "No se pudo hacer el registro, intente nuevamente",
      );
    } catch (e) {
      setErrorName("No se pudo conectar con el servidor, intente nuevamente");
    }
  }

  return (
    <FormLayout title="Iniciar sesion" errorNotification={errorName}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <FieldType
          name="Nombre de usuario"
          inputName="username"
          inputPlaceholder="Ej. juanperez01"
          inputType="text"
          registerHook={register}
          error={errors}
        />

        <FieldType
          name="Contraseña"
          inputName="password"
          inputPlaceholder="Ej. Kakoq12nagsNm"
          inputType="password"
          isPassword={true}
          registerHook={register}
          error={errors}
        />
        <ActionsButtons
          buttonName="Iniciar sesion"
          isSubmitting={isSubmitting}
        />
      </form>
      <Info
        text="¿No tienes cuenta?"
        linkName="Registrarse"
        url="/auth/register"
      />
    </FormLayout>
  );
};
