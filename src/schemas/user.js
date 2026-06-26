import { z } from "zod";

export const userBackendSchema = z.object({
  name: z
    .string("Se requiere un nombre")
    .min(1, "Valor no valido, minimo debe tener 1 elemento")
    .max(22, "Solo se pueden escribir 22 caracteres"),

  username: z
    .string("Escribe un nombre de usuario")
    .min(4, "El nombre de usuario deber tener minimo 4 caracteres")
    .regex(/^\S+$/, "El nombre de usuario no debe tener espacios")
    .regex(/^[a-z0-9]+$/, "El nombre de usuario no debe tener mayusculas")
    .trim(),

  relationship: z.enum(
    ["hijo", "sobrino", "esposo", "hermano", "externo"],
    'Opcion invalida se requiere uno de estos campos "hijo", "sobrino", "esposo", "hermano" "externo"',
  ),
  tel: z
    .string("El telefono es requerido")
    .min(10, "El numero debe tener 10 caracteres")
    .startsWith("3", "El numero debe empezar con 3")
    .regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido")
    .max(10, "El numero debe tener menos de 10 caracteres"),

  email: z.email("Formato de correo electrónico inválido").optional(),

  password: z
    .string("Se requiere una contraseña")
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
