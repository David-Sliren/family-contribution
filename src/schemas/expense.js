import z from "zod";

export const expenseCategory = z.enum([
  "medicina",
  "transporte",
  "suplemento",
  "clinico",
  "suministro",
  "cuidador",
]);

export const expenseCurrency = z.enum(["COP", "USD"]);

export const expenseSchema = z.object({
  name: z.string().min(3, "Debe tener minimo 3 caracteres"),
  amount: z.coerce
    .number()
    .positive("Debe ser mayor a 0")
    .min(1000, "No debe ser menor a 1000"),
  currency: expenseCurrency,
  category: expenseCategory,
  description: z
    .string()
    .trim()
    .transform((value) => value || "sin descripcion")
    .pipe(z.string().min(3, "Debe tener minimo 3 caracteres"))
    .optional(),
  patientId: z.string().regex(/^[0-9a-fA-F]{24}$/, "el id no es valido"),
  createBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "el id no es valido"),
  updateBy: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "el id no es valido")
    .optional(),
  date: z.iso.datetime("elija una fecha correcta").optional(),
});

export const expenseSchemaFrontend = expenseSchema
  .omit({
    updateBy: true,
  })
  .extend({
    createBy: expenseSchema.shape.createBy.optional(),
  });
