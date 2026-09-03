"use client";

import { useEffect, useRef } from "react";
import { Modal } from "@/components/ui/dialogs/Modal";
import { ButtonVariant } from "@/components/ui/buttons/ButtonVariant";
import { FormLayout } from "../form/layout/FormLayout";

export function DialogAdd({
  inputName = "Añadir",
  title,
  description,
  handdleFormMain = () => "",
  children,
  errorNotification,
  modalRef,
  idModal,
  handdlerClose = () => "",
}) {
  return (
    <>
      <Modal
        id={idModal}
        ref={modalRef}
        title={title}
        description={description}
        onClose={handdlerClose}
      >
        <FormLayout errorNotification={errorNotification}>
          <form onSubmit={handdleFormMain} className="space-y-4">
            {children}
            <span className="flex gap-2 w-full justify-center items-center">
              <ButtonVariant type="submit" variant="primary">
                {inputName}
              </ButtonVariant>
              <ButtonVariant
                type="button"
                variant="secundary"
                commandfor={idModal}
                command="close"
              >
                cancelar
              </ButtonVariant>
            </span>
          </form>
        </FormLayout>
      </Modal>
    </>
  );
}
