import z from "zod";

export const inventorySchema = z.object({
  name: z.string().min(3, "Debe tener minimo 3 caracteres"),
  totalUnit: z.coerce.number().min(1, "Debe tener como minimo 1 unidad"),
  price: z.coerce
    .number()
    .positive("Debe ser un número positivo")
    .min(1000, "No debe ser inferior a 1000"),
  date: z.iso.datetime("Formato de fecha invalido").optional(),
  status: z.enum(["en orden", "agotado", "bajo"]),
  concentration: z
    .string()
    .trim()
    .transform((value) => value || "no requiere")
    .pipe(z.string().min(3, "Debe tener minimo 3 caracteres"))
    .optional(),
  category: z.enum(["medicina", "suplemento", "suministro"]),
  description: z
    .string()
    .max(200, "Debe tener maximo 200 caracteres")
    .optional(),
  patientId: z.string().regex(/^[0-9a-fA-F]{24}$/, "el id no es valido"),
  createBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "el id no es valido"),
  updateBy: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "el id no es valido")
    .optional(),
});

export const inventoryUpdateSchema = inventorySchema.omit({
  createBy: true,
  patientId: true,
});

export const inventorySchemaFrontend = inventorySchema.omit({
  createBy: true,
  updateBy: true,
});

export const inventoryCategory = z.enum([
  "medicina",
  "suplemento",
  "suministro",
]);

export const inventoryStatus = z.enum(["en orden", "bajo", "agotado"]);
