import { z } from "zod";

const purpose = z.enum(["medicinas", "facturas", "cuidador"], {
  error: 'proposito no admitido, usar "medicinas", "facturas", "cuidador"',
});

export const contributionSchemaFrontend = z.object({
  amount: z.coerce
    .number("se espera un numero")
    .positive("El monto debe ser mayor a 0")
    .min(6000, "El Monto minimo es de $6000"),
  purpose: purpose,
  date: z.iso.datetime("elija una fecha correcta").optional(),
});
