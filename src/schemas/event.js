import { Types } from "mongoose";
import { z } from "zod";

export const eventBackendSchema = z.object({
  type: z.enum(["contribution", "inventory", "expense"]),
  action: z.enum(["creado", "actualizado", "eliminado"]),
  entityId: z.refine((val) => Types.ObjectId.isValid(val), {
    error: "el id no es valido",
  }),
  patientId: z
    .refine((val) => Types.ObjectId.isValid(val), {
      error: "el id no es valido",
    })
    .optional(),
  createBy: z.refine((val) => Types.ObjectId.isValid(val), {
    error: "el id no es valido",
  }),
  description: z.string().min(3, "Debe tener minimo 3 caracteres"),
  amount: z.coerce
    .number("se espera un numero")
    .min(0, "el monto no puede ser negativo")
    .optional(),
});

export const eventFrontedSchema = eventBackendSchema.omit({
  entityId: true,
  createBy: true,
});
