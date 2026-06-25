import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string("Escribe el nombre de usuario")
    .regex(/^\S+$/, "El nombre de usuario no debe tener espacios")
    .toLowerCase()
    .trim(),
  password: z
    .string("Se requiere una contraseña")
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener mayusculas")
    .regex(/[1-9]\d{1,4}/, "La contraseña debe tener minimo 2 numeros"),
});
