import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/errorHandler";
import { LoginUser } from "../../application/usescases/loginUser";
import { UserLoginForm } from "../zodValidation/login_validation";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export const useLoginController = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserLoginForm> = async (data) => {
    try {
      await toast
        .promise(LoginUser(data), {
          loading: "Iniciando sesión...",
          success: "¡Inicio de sesión exitoso!",
          error: "Crendenciales incorrectas",
        })
        .then(() => {
          navigate("/home");
        });
    } catch (error) {
      getErrorMessage(error);
    }
  };

  return { onSubmit };
};
