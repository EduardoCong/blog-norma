import axios from "axios";
import { getToken, getUserEmail, getUserName } from "../../utils/auth";
import { Comments } from "../models/comments";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const postComment = async (
  id: number,
  contenido: string
): Promise<Comments> => {
  const token = getToken();
  await axios.post(
    `${API_URL}/api2/comentarios/${id}`,
    {
      nombre_usuario: getUserName(),
      email_usuario: getUserEmail(),
      contenido,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    nombre_usuario: getUserName(),
    contenido,
    fecha_comentario: new Date().toISOString(),
  };
};
