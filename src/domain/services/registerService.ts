import axios from 'axios';
import { UserRegisterForm } from '../../presentation/zodValidation/register_validation';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const RegisterService = async (data: UserRegisterForm) => {
  const response = await axios.post(`${API_URL}/api/register`, {
    nombre_usuario: data.user,
    correo: data.email,
    contraseña: data.password,
  });
  return response.data.usuario;
}