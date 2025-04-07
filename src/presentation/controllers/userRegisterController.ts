import toast from "react-hot-toast";
import { RegisterService } from "../../domain/services/registerService";
import { getErrorMessage } from "../../utils/errorHandler";
import { UserRegisterForm } from "../zodValidation/register_validation";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useRegisterController = () => {
    const navigate = useNavigate();
    
    const onSubmit: SubmitHandler<UserRegisterForm> = async (data) => {
        try {
            await toast.promise(RegisterService(data), {
                loading: "Registrando...",
                success: "¡Registro exitoso!",
                error: "Error al registrar",
            }).then(() => {
                navigate("/");
            });
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    }

    return { onSubmit };
}