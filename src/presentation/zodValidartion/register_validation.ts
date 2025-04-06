import { z } from "zod";

export const userRegisterSchema = z.object({
  user: z.string().nonempty({ message: "El nombre de usuario es requerido" }),
  email: z
    .string()
    .nonempty({ message: "El email de usuario es requerido" })
    .email({ message: "Debe ser un email válido" }),
  password: z
    .string()
    .nonempty({ message: "La constrasena es requerida" })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export type UserRegisterForm = z.infer<typeof userRegisterSchema>;
