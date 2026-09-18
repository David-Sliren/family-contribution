import z from "zod";

export const inventorySchema = z.object({
  name: z.string().min(3, "Debe tener minimo 3 caracteres"),
  totalUnit: z.number().min(1, "Debe tener como minimo 1 unidad"),
  price: z.number().default(0).optional(),
  date: z
    .date()
    .default(() => new Date())
    .optional(),
  status: z.enum(["en orden", "agotado", "bajo"]),
  concentration: z.string().min(3, "Debe tener minimo 3 caracteres").optional(),
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
