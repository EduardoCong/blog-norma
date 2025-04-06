import { LoginService } from "../../domain/services/authServices";
import { UserLoginForm } from "../../presentation/zodValidartion/login_validation";

export const LoginUser = async (data: UserLoginForm) => {
  const user = await LoginService(data);

  localStorage.setItem("rol", user.id_autor);
  localStorage.setItem("token", user.token);
  localStorage.setItem("token_expires", user.token_expires);
  localStorage.setItem("id_autor", user.id_autor);
  localStorage.setItem("nombre_usuario", user.nombre_usuario);
  localStorage.setItem("correo", user.correo);

  return user;
};
