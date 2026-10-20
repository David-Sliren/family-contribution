"use client";

import { ButtonVariant } from "@/components/ui/buttons/ButtonVariant";
import { Modal } from "@/components/ui/dialogs/Modal";
import { useUpdateUserRole } from "@/hooks/tanstack/mutation/useMutationUser";
import { useNotification } from "@/store/ui/notifications";
import { useState } from "react";

const roles = ["user", "carer", "admin"];

export function ChangeUserRoleDialog({ user, dialogRef }) {
  const [role, setRole] = useState(user.role);
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useUpdateUserRole();
  const setNotification = useNotification((state) => state.setNotification);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await mutateAsync({ id: user.id, role });
      setNotification({ message: `Rol de ${user.name} actualizado` });
      dialogRef.current?.close();
    } catch (mutationError) {
      setError(mutationError || "No se pudo actualizar el rol");
    }
  }

  function handleClose() {
    setRole(user.role);
    setError("");
  }

  return (
    <Modal
      id="change-user-role"
      ref={dialogRef}
      title="Cambiar rol"
      description={`Selecciona el nuevo rol para ${user.name}.`}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit} className="min-w-64 space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="user-role"
            className="block text-xs font-semibold text-on-surface-variant tracking-[0.05em] ml-1"
          >
            Rol
          </label>
          <select
            id="user-role"
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="w-full bg-surface-container-low border rounded-2xl px-3 py-3 outline-none transition-all text-primary cursor-pointer capitalize"
          >
            {roles.map((option) => (
              <option key={option} value={option} className="capitalize">
                {option}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <ButtonVariant
            type="button"
            variant="secundary"
            commandfor="change-user-role"
            command="close"
            disabled={isPending}
          >
            Cancelar
          </ButtonVariant>
          <ButtonVariant
            type="submit"
            disabled={isPending || role === user.role}
          >
            {isPending ? "Guardando..." : "Guardar"}
          </ButtonVariant>
        </div>
      </form>
    </Modal>
  );
}
