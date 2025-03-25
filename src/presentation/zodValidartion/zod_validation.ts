import { z } from "zod";

export interface IUserInput {
  email: string;
  password: string;
}

export const userSchema = z.object({
  email: z.string().email({ message: "Debe ser un email válido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export type UserInput = z.infer<typeof userSchema>;

export function validateUserInput(data: IUserInput): UserInput {
  const result = userSchema.safeParse(data);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
}
