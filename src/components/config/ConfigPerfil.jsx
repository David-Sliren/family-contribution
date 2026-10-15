"use client";
import { useUserStore } from "@/components/provaider/AuthProvider";
import { ActionsButtons } from "@/components/ui/form/buttons/ActionsButtons";
import { FieldSelect } from "@/components/ui/form/inputs/FieldSelect";
import { FieldType } from "@/components/ui/form/inputs/FieldType";
import { FormLayout } from "@/components/ui/form/layout/FormLayout";
import { useHookForm } from "@/hooks/useHookForm";
import { profileFrontedSchema } from "@/schemas/user";
import { useNotification } from "@/store/ui/notifications";
import { authClient } from "@/utils/auth-client";
import { useState } from "react";
import { AvatarUpload } from "../ui/avatar/AvatarUpload";
import { DEFAULT_IMG } from "@/constants/forDefault";
import { uploadFile } from "@/utils/uploadFile";
import { FOLDER_IMAGES } from "@/constants/sizes";

export const ConfigPerfil = () => {
  const { user } = useUserStore();
  const setNotification = useNotification((state) => state.setNotification);
  const [isError, setIsError] = useState("");
  const { handleSubmit, register, errors, isSubmitting } = useHookForm({
    schema: profileFrontedSchema,
    defaultValues: {
      name: user?.name ?? "",
      username: user?.username ?? "",
      relationship: user?.relationship ?? "",
    },
  });

  async function handleSaveAvatar(file) {
    const folder = FOLDER_IMAGES[0].name;

    let url;

    try {
      ({ url } = await uploadFile({ file, folder }));
    } catch {
      setNotification({
        message: "No se pudo subir la imagen, intente nuevamente",
        type: "error",
      });
      throw new Error("upload failed");
    }

    const { error } = await authClient.updateUser({ image: url });

    if (error) {
      setNotification({
        message: "No se pudo guardar la imagen de perfil",
        type: "error",
      });
      throw new Error("save failed");
    }

    setNotification({
      message: "Imagen de perfil actualizada",
      type: "success",
    });
  }

  async function handleSubmitForm(data) {
    try {
      setIsError("");
      const { error } = await authClient.updateUser({
        name: data.name,
        username: data.username,
        relationship: data.relationship,
      });

      if (!error) {
        return setNotification({
          message: "Perfil actualizado",
          type: "success",
        });
      }

      if (error.code === "USERNAME_IS_ALREADY_TAKEN") {
        return setIsError("El nombre de usuario ya existe");
      }

      return setIsError(
        error.message || "No se pudo actualizar el perfil, intente nuevamente",
      );
    } catch (e) {
      setIsError("No se pudo conectar con el servidor, intente nuevamente");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <AvatarUpload
        image={user?.image || DEFAULT_IMG}
        onSave={handleSaveAvatar}
      />
      <FormLayout title="Información personal" errorNotification={isError}>
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

          <FieldSelect
            registerHook={register}
            fieldValues={profileFrontedSchema.shape.relationship.options}
          />

          <ActionsButtons
            buttonName="Guardar cambios"
            isSubmitting={isSubmitting}
          />
        </form>
      </FormLayout>
    </div>
  );
};
