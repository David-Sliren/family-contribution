import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Formato de correo electrónico inválido"),
  password: z
    .string("se requiere una contraseña")
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener mayusculas")
    .regex(/[1-9]\d{1,4}/, "La contraseña debe tener minimo 2 numeros"),
});
