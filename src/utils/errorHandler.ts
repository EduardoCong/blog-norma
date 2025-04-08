import axios from "axios";
import { ZodError } from "zod";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error;
  }
  if (error instanceof ZodError) {
    return "Error de validación: " + JSON.stringify(error.format());
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Error desconocido";
};


