"use client";

import { useRef, useTransition } from "react";
import { Modal } from "@/components/ui/dialogs/Modal";
import { ButtonVariant } from "@/components/ui/buttons/ButtonVariant";
// import { addMedicine } from "@/actions/medicine.actions";

/**
 * Sigue el mismo patrón de Server Action que armamos para contribuciones:
 * la escritura real (auth + Mongoose) vive en /actions/medicine.actions.js,
 * nunca aquí. Este componente solo maneja apertura del modal + isPending.
 */
export function AddInventoryDialog({ triggerLabel = "Añadir medicina" }) {
  const dialogRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData) {
    startTransition(async () => {
      const result = await addMedicine(formData);
      if (result.success) {
        dialogRef.current?.close();
      }
      // El error se podría mostrar con el store de notificación de Zustand
      // (useNotification.setNotification) igual que en el flujo de pagos.
    });
  }

  return (
    <>
      <ButtonVariant
        variant="primary"
        onClick={() => dialogRef.current?.showModal()}
      >
        {triggerLabel}
      </ButtonVariant>

      <Modal
        ref={dialogRef}
        title="Añadir medicina"
        description="Crea un artículo de inventario y define el nivel mínimo de reposición."
      >
        <form action={handleSubmit} className="grid gap-3.5">
          <label className="grid gap-1.5 text-[12px] font-bold font-body text-on-surface">
            Nombre y presentación
            <input
              name="name"
              required
              placeholder="Ej. Losartán 50 mg"
              className="w-full rounded-card bg-surface-container-low px-3 min-h-11 font-body text-sm outline-none"
            />
          </label>

          <label className="grid gap-1.5 text-[12px] font-bold font-body text-on-surface">
            Categoría
            <select
              name="category"
              required
              defaultValue=""
              className="w-full rounded-card bg-surface-container-low px-3 min-h-11 font-body text-sm outline-none"
            >
              <option value="" disabled>
                Seleccionar categoría
              </option>
              <option value="medicinas">Medicinas</option>
              <option value="suplementos">Suplementos</option>
              <option value="insumos">Insumos</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3.5">
            <label className="grid gap-1.5 text-[12px] font-bold font-body text-on-surface">
              Stock actual
              <input
                name="stock"
                type="number"
                required
                placeholder="0"
                className="w-full rounded-card bg-surface-container-low px-3 min-h-11 font-body text-sm outline-none"
              />
            </label>
            <label className="grid gap-1.5 text-[12px] font-bold font-body text-on-surface">
              Nivel mínimo
              <input
                name="minLevel"
                type="number"
                required
                placeholder="0"
                className="w-full rounded-card bg-surface-container-low px-3 min-h-11 font-body text-sm outline-none"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2.5 mt-4">
            <ButtonVariant
              type="button"
              variant="secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Cancelar
            </ButtonVariant>
            <ButtonVariant type="submit" variant="primary" disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar medicina"}
            </ButtonVariant>
          </div>
        </form>
      </Modal>
    </>
  );
}
