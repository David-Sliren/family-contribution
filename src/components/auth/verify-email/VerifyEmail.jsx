"use client";
import { Info } from "@/components/ui/form/info/Info";
import { FormLayout } from "@/components/ui/form/layout/FormLayout";
import React from "react";

const ERRORS = {
  INVALID_TOKEN:
    "El enlace de verificación no es válido o ya fue usado. Inicia sesión para recibir uno nuevo.",
  TOKEN_EXPIRED:
    "El enlace de verificación expiró. Inicia sesión para recibir uno nuevo.",
  USER_NOT_FOUND:
    "No encontramos la cuenta asociada a este correo. Regístrate nuevamente.",
  INVALID_USER: "El enlace no corresponde a la cuenta actual.",
};

export const Index = ({ error = "" }) => {
  const message = error
    ? ERRORS[error] || "No se pudo verificar tu correo, intente nuevamente"
    : "Tu correo fue verificado correctamente. Ya puedes iniciar sesión con tu cuenta.";

  return (
    <FormLayout
      title={error ? "Verificación fallida" : "Correo verificado"}
      errorNotification={error ? message : ""}
    >
      {!error && (
        <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-2">
          {message}
        </p>
      )}
      <Info
        text="¿Listo para entrar?"
        linkName="Iniciar sesion"
        url="/auth/login"
      />
    </FormLayout>
  );
};
