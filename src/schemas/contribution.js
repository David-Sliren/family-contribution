import { Types } from "mongoose";
import { z } from "zod";

const status = z.enum(["confirmed", "pending"], {
  error: "el estado no es admitido, usar 'confirmed' o 'pending'",
});
const purpose = z.enum(["medicine", "cost", "assistant"], {
  error: "proposito no admitido, usar 'medicine', 'cost', 'assistant'",
});

export const contributionSchema = z.object({
  userId: z.refine((val) => Types.ObjectId.isValid(val), {
    error: "el id no es valido",
  }),
  amount: z.coerce
    .number("se espera un numero")
    .positive("El monto debe ser mayor a 0"),
  status: status,
  purpose: purpose,
  date: z.iso.date("elija una fecha correcta").optional(),
});
