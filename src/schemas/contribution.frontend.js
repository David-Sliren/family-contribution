import { z } from "zod";

const purpose = z.enum(["medicinas", "facturas", "cuidador"], {
  error: 'proposito no admitido, usar "medicinas", "facturas", "cuidador"',
});

const status = z.enum(["confirmado", "pendiente"], {
  error: "el estado no es admitido, usar 'confirmado' o 'pendiente'",
});

const method = z.enum(["efectivo", "transferencia"], {
  error: "metodo no admitido, usar 'efectivo', 'transferencia'",
});

export const contributionSchemaFrontend = z.object({
  amount: z.coerce
    .number("se espera un numero")
    .positive("El monto debe ser mayor a 0")
    .min(6000, "El Monto minimo es de $6000"),
  purpose: purpose,
  date: z.iso.datetime("elija una fecha correcta").optional(),
});

export const contributionSchemaFrontendDashboard = z.object({
  paymentId: z.string().optional().or(z.literal("")),
  method: method,
  userId: z.string("no hay "),
  amount: z.coerce
    .number("se espera un numero")
    .positive("El monto debe ser mayor a 0")
    .min(6000, "El Monto minimo es de $6000"),
  status: status,
  purpose: purpose,
  date: z.iso.datetime("elija una fecha correcta").optional(),
});
