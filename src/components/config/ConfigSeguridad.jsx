"use client";
import { ActionsButtons } from "@/components/ui/form/buttons/ActionsButtons";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { FormLayout } from "@/components/ui/form/layout/FormLayout";
import { useHookForm } from "@/hooks/useHookForm";
import { passwordFrontedSchema } from "@/schemas/user";
import { useNotification } from "@/store/ui/notifications";
import { authClient } from "@/utils/auth-client";
import { useState } from "react";

export const ConfigSeguridad = () => {
  const setNotification = useNotification((state) => state.setNotification);
  const [isError, setIsError] = useState("");
  const { handleSubmit, register, errors, isSubmitting, reset } = useHookForm({
    schema: passwordFrontedSchema,
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmitForm(data) {
    try {
      setIsError("");
      const { error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.password,
      });

      if (!error) {
        reset();
        return setNotification({
          message: "Contraseña actualizada",
          type: "success",
        });
      }

      if (error.code === "INVALID_PASSWORD") {
        return setIsError("La contraseña actual es incorrecta");
      }

      return setIsError(
        error.message ||
          "No se pudo actualizar la contraseña, intente nuevamente",
      );
    } catch (e) {
      setIsError("No se pudo conectar con el servidor, intente nuevamente");
    }
  }

  return (
    <FormLayout title="Seguridad" errorNotification={isError}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <FieldType
          name="Contraseña actual"
          inputName="currentPassword"
          inputPlaceholder="Escribe tu contraseña actual"
          inputType="password"
          isPassword={true}
          registerHook={register}
          error={errors}
        />

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
          name="Confirmar nueva contraseña"
          inputName="confirmPassword"
          inputPlaceholder="Repite la nueva contraseña"
          inputType="password"
          isPassword={true}
          registerHook={register}
          error={errors}
        />

        <ActionsButtons
          buttonName="Actualizar contraseña"
          isSubmitting={isSubmitting}
        />
      </form>
    </FormLayout>
  );
};
