import axios from "axios";
import { UserLoginForm } from "../../presentation/zodValidartion/login_validation";

export const LoginService = async (data: UserLoginForm) => {
    const response = await axios.post("http://localhost:4000/api/login", {
        correo: data.email,
        contraseña: data.password,
    });
    return response.data.usuario;
}