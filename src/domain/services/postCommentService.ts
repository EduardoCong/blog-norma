import axios from "axios";
import { getToken } from "../../utils/auth";
import { Comments } from "../models/comments";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const postComment = async (id: number, content: string) => {
  const token = getToken();
  const { data }: { data: Comments } = await axios.post(
    `${API_URL}/api2/comentarios/${id}`,
    {
      nombre_usuario: localStorage.getItem("nombre_usuario"),
      email_usuario: localStorage.getItem("correo"),
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
};
