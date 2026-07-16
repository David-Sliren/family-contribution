"use client";
import { useNotification } from "@/store/ui/notifications";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const STATUS_MESSAGES = {
  approved: {
    message: "¡Pago recibido, gracias por tu ayuda!",
    type: "success",
  },
  success: {
    message: "¡Pago recibido, gracias por tu ayuda!",
    type: "success",
  },
  confirmed: {
    message: "¡Pago recibido, gracias por tu ayuda!",
    type: "success",
  },
  pending: { message: "Tu pago está siendo procesado", type: "info" },
  rejected: { message: "El pago no se pudo procesar", type: "error" },
  failure: { message: "El pago no se pudo procesar", type: "error" },
};

export const NotificationPayment = ({ status }) => {
  const router = useRouter();
  const setNotification = useNotification((state) => state.setNotification);

  useEffect(() => {
    if (!status) return;

    const statusNotification = STATUS_MESSAGES[status];

    setNotification({
      message: statusNotification?.message,
      type: statusNotification?.type,
    });

    router.replace("/", { scroll: false });
    router.refresh();
  }, [router, status, setNotification]);

  return null;
};
