"use client";
import { ActionsButtons } from "@/components/ui/form/buttons/ActionsButtons";
import { FieldSelect } from "@/components/ui/form/inputs/FieldSelect";
import { FieldTel } from "@/components/ui/form/inputs/FieldTel";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { FormLayout } from "@/components/ui/form/layout/FormLayout";
import { userFrontedSchema } from "@/schemas/user";
import React, { useState } from "react";
import { useHookForm } from "@/hooks/useHookForm";
import { useRouter } from "next/navigation";
import { Info } from "@/components/ui/form/info/Info";
import { createUser } from "@/services/user/auth";

// const DEFAULVALUES = {
// name: "Jhojan",
// username: "juanperez01",
// tel: "3044518133",
// email: "correo@correo.com",
// password: "Noseqponer12",
// confirmPassword: "Noseqponer12",
// };

export const Index = () => {
  const router = useRouter();
  const [isError, setIsError] = useState("");
  const { handleSubmit, register, errors, isSubmitting, reset } = useHookForm({
    schema: userFrontedSchema,
    // defaultValues: DEFAULVALUES,
  });

  async function handleSubmitForm(data) {
    const { confirmPassword, ...backendData } = data;
    try {
      setIsError("");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await createUser(backendData);
      router.replace("/auth/login");
      reset();
    } catch (error) {
      setIsError(error);
    }
  }

  return (
    <FormLayout title="Registrarse" errorNotification={isError}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <FieldType
          name="Nombre"
          inputName="name"
          inputPlaceholder="Ej. Juan Pérez"
          inputType="text"
          registerHook={register}
          error={errors}
        />

        <FieldType
          name="Nombre de usuario"
          inputName="username"
          inputPlaceholder="Ej. juanperez01"
          inputType="text"
          registerHook={register}
          error={errors}
        />

        {/* <!-- Input: Monto --> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FieldTel registerHook={register} error={errors} />
          <FieldSelect registerHook={register} />
        </div>

        {/* <FieldType
          name="email"
          inputName="email"
          inputPlaceholder="Ej. correo@correo.com"
          inputType="email"
          registerHook={register}
          error={errors}
        /> */}

        <FieldType
          name="Contraseña"
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

        {/* <!-- Actions --> */}
        <ActionsButtons buttonName="Registrarse" isSubmitting={isSubmitting} />
      </form>
      <Info
        text="¿Ya tiene una cuenta?"
        linkName="Iniciar sesion"
        url="/auth/login"
      />
    </FormLayout>
  );
};
