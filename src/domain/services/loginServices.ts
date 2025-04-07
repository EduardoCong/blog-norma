import axios from "axios";
import { UserLoginForm } from "../../presentation/zodValidartion/login_validation";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const LoginService = async (data: UserLoginForm) => {
    const response = await axios.post(`${API_URL}/api/login`, {
        correo: data.email,
        contraseña: data.password,
    });
    return response.data.usuario;
}