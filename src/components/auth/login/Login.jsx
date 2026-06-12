"use client";
import { ActionsButtons } from "@/components/ui/form/buttons/ActionsButtons";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { FormLayout } from "@/components/ui/form/layout/FormLayout";
import React, { useState } from "react";
import { useHookForm } from "@/hooks/useHookForm";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/login";
import { Info } from "@/components/ui/form/info/Info";
import { loginUser } from "@/services/user/auth";
import { useUserStore } from "@/components/provaider/AuthProvider";

const DEFAULVALUES = {
  email: "correo@correo.com",
  password: "Noseqponer12",
};

export const Index = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isError, setIsError] = useState("");
  const { handleSubmit, register, errors, isSubmitting, reset } = useHookForm({
    schema: loginSchema,
    defaultValues: DEFAULVALUES,
  });

  async function handleSubmitForm(data) {
    const { confirmPassword, ...backendData } = data;
    try {
      setIsError("");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await loginUser(backendData);
      // setUser(data);
      router.refresh();
      // router.replace("/");
      reset();
    } catch (error) {
      setIsError(error);
    }
  }

  return (
    <FormLayout title="Iniciar sesion" errorNotification={isError}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <FieldType
          name="email"
          inputName="email"
          inputPlaceholder="Ej. correo@correo.com"
          inputType="email"
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
