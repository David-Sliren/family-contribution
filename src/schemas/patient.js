import z from "zod";

export const patientSchema = z.object({
  name: z.string().min(3, "Debe tener minimo 3 caracteres"),
  lastName: z.string().min(3, "Debe tener minimo 3 caracteres"),
  img: z
    .string()
    .min(3, "Debe tener minimo 3 caracteres")
    .optional()
    .or(z.literal("")),
  age: z.coerce
    .number("Debe ser un numero")
    .min(1, "Debe tener como minimo 1 año"),
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "el id no es valido"),
  goal: z.coerce
    .number("Debe ser un numero")
    .min(100000, "Debe ser mayoro igual a 100000"),
  reason: z.string().min(3, "Debe tener como minimo 3 caracteres"),
  description: z.string().min(3, "Debe tener minimo 3 caracteres"),
  carerName: z.string().min(3, "Debe tener minimo 3 caracteres").optional(),
  clinicName: z.string().min(3, "Debe tener minimo 3 caracteres").optional(),
});

export const patientSchemaFrontend = patientSchema.omit({ userId: true });

export const patientUpdateSchema = patientSchema.omit({ userId: true });
