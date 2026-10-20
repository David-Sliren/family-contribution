import z from "zod";

export const patientSchema = z.object({
  name: z.string().min(3, "Debe tener minimo 3 caracteres"),
  lastName: z.string().min(3, "Debe tener minimo 3 caracteres"),
  image: z
    .string()
    .min(3, "Debe tener minimo 3 caracteres")
    .optional()
    .or(z.literal("")),
  age: z.coerce
    .number("Debe ser un numero")
    .min(1, "Debe tener como minimo 1 año"),
  createBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "el id no es valido"),
  goal: z.coerce
    .number("Debe ser un numero")
    .min(100000, "Debe ser mayoro igual a 100000"),
  reason: z.string().min(3, "Debe tener como minimo 3 caracteres"),
  description: z.string().min(3, "Debe tener minimo 3 caracteres"),
  carerName: z.string().min(3, "Debe tener minimo 3 caracteres").optional(),
  clinicName: z.string().min(3, "Debe tener minimo 3 caracteres").optional(),
  tel: z
    .string("El telefono es requerido")
    .min(10, "El numero debe tener 10 caracteres")
    .startsWith("3", "El numero debe empezar con 3")
    .regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido")
    .max(10, "El numero debe tener menos de 10 caracteres"),
  keyT: z
    .string("La clave transacional es requerida")
    .trim()
    .min(1, "La clave transacional es requerida"),
});

export const patientSchemaFrontend = patientSchema.omit({ createBy: true });

export const patientUpdateSchema = patientSchema
  .omit({ createBy: true })
  .partial();
