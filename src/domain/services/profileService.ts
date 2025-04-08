import axios from "axios";
import { User } from "../../domain/models/user";
import { getToken, getUserId } from "../../utils/auth";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const token = getToken();
const id = getUserId();

const headers = {
  Authorization: `Bearer ${token}`,
};

export const getPerfil = async (): Promise<User> => {
  const { data } = await axios.get(`${API_URL}/api2/usersAutor/${id}`, {
    headers,
  });
  return data.usuario;
};

export const updatePassword = async (newPassword: string) => {
  await axios.put(
    `${API_URL}/api2/users/${id}`,
    { contrasena: newPassword },
    { headers }
  );
};

export const updateBiografia = async (bio: string) => {
  await axios.put(
    `${API_URL}/api2/users/${id}`,
    { biografia: bio },
    { headers }
  );
};

export const updateFotoPerfil = async (base64: string): Promise<string> => {
  const { data } = await axios.post(
    `${API_URL}/uploads/users/${id}`,
    { foto_perfil: base64 },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return data.secure_url;
};
