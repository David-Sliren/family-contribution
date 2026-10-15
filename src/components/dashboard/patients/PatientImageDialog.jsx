"use client";

import { useEffect } from "react";
import { CoverUpload } from "@/components/ui/avatar/CoverUpload";
import { Modal } from "@/components/ui/dialogs/Modal";
import { ButtonVariant } from "@/components/ui/buttons/ButtonVariant";
import { FOLDER_IMAGES } from "@/constants/sizes";
import { useUpdatePatient } from "@/hooks/tanstack/mutation/useMutationPatient";
import { useNotification } from "@/store/ui/notifications";
import { uploadFile } from "@/utils/uploadFile";

export function PatientImageDialog({ patient, dialogRef }) {
  const setNotification = useNotification((state) => state.setNotification);
  const { mutateAsync, isSuccess } = useUpdatePatient(patient?.id);

  useEffect(() => {
    if (isSuccess) dialogRef.current?.close();
  }, [isSuccess, dialogRef]);

  async function handleSaveImage(file) {
    try {
      const { url } = await uploadFile({
        file,
        folder: FOLDER_IMAGES[1].name,
      });

      await mutateAsync({ ...patient, image: url });
      setNotification({ message: "Imagen del paciente actualizada" });
    } catch {
      setNotification({
        message: "No se pudo actualizar la imagen del paciente",
        type: "error",
      });
      throw new Error("upload failed");
    }
  }

  return (
    <Modal
      id="patient-image"
      ref={dialogRef}
      title="Cambiar imagen"
      description="Sube una foto del paciente. El tamaño de la imagen se ajusta al formato portada."
      className="scrollbar-none"
    >
      <CoverUpload image={patient?.image || ""} onSave={handleSaveImage} />
      <div className="flex justify-center mt-4">
        <ButtonVariant
          type="button"
          variant="secundary"
          commandfor="patient-image"
          command="close"
        >
          Cancelar
        </ButtonVariant>
      </div>
    </Modal>
  );
}
