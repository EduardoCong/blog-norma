import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "El email es requerido" })
    .email({ message: "Debe ser un email válido" }),
  password: z
    .string()
    .nonempty({ message: "La contrasena es requerida" })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export type UserLoginForm = z.infer<typeof userSchema>;
