import { z } from "zod";

export const userBackendSchema = z.object({
  name: z
    .string("se requiere un nombre")
    .min(1, "Valor no valido, minimo debe tener 1 elemento"),
  username: z
    .string("escribe un nombre de usuario")
    .regex(/^\S+$/, "El nombre de usuario no debe tener espacios")
    .toLowerCase()
    .trim(),

  relationship: z.enum(
    ["hijo", "sobrino", "esposo", "externo"],
    'opcion invalida se requiere uno de estos campos "hijo", "sobrino", "esposo", "externo"',
  ),
  tel: z
    .string("el telefono es requerido")
    .regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido")
    .min(10, "el numero debe tener 10 caracteres"),
  email: z.email("Formato de correo electrónico inválido"),
  password: z
    .string("se requiere una contraseña")
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener mayusculas")
    .regex(/[1-9]\d{1,4}/, "La contraseña debe tener minimo 2 numeros"),
});

export const userFrontedSchema = userBackendSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "La contraseña no coincide",
    path: ["confirmPassword"],
  });
