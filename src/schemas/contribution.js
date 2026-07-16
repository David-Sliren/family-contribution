import { Types } from "mongoose";
import { z } from "zod";

const status = z.enum(["confirmado", "pendiente"], {
  error: "el estado no es admitido, usar 'confirmado' o 'pendiente'",
});
const purpose = z.enum(["medicinas", "facturas", "cuidador"], {
  error: 'proposito no admitido, usar "medicinas", "facturas", "cuidador"',
});

const method = z.enum(["pasarela", "efectivo", "transferencia"], {
  error: "metodo no admitido, usar 'pasarela', 'efectivo', 'transferencia'",
});

export const contributionSchemaBanckend = z.object({
  paymentId: z.string().optional(),
  method: method,
  userId: z.refine((val) => Types.ObjectId.isValid(val), {
    error: "el id no es valido",
  }),
  amount: z.coerce
    .number("se espera un numero")
    .positive("El monto debe ser mayor a 0")
    .min(6000, "El Monto minimo es de $6000"),
  status: status,
  purpose: purpose,
  date: z.iso.datetime("elija una fecha correcta").optional(),
});
