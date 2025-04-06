import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  UserLoginForm,
  userSchema,
} from "../../zodValidartion/login_validation";
import axios from "axios";
import { getErrorMessage } from "../../../utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginForm>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserLoginForm> = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        correo: data.email,
        contraseña: data.password,
      });

      const usuario = response.data.usuario;

      localStorage.setItem("rol", usuario.id_autor);
      localStorage.setItem("token", usuario.token);
      localStorage.setItem("token_expires", usuario.token_expires);
      localStorage.setItem("id_autor", usuario.id_autor);
      localStorage.setItem("nombre_usuario", usuario.nombre_usuario);
      localStorage.setItem("correo", usuario.correo);

      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        timer: 900,
        showConfirmButton: false,
      }).then(() => {
        navigate("/home");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: getErrorMessage(error),
      });
    }
  };

  return (
    <motion.div
      className="navbar-container fixed top-0 w-full bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy8Zl8c4c8H1mmsKu2n5EFcrBd-cn8003_g&s"
            className="w-10 h-10"
            alt="Logo"
          />
          <h1 className="text-[14px]">ScienceUTM</h1>
        </div>
        <ul className="flex space-x-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "button-register-active px-4 py-2 rounded-[12px]"
                  : "button-register px-4 py-2 rounded-[12px]"
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className="button-register px-4 py-2 rounded-[12px]"
            >
              Registro
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="div-line"></div>

      <div className="div-container-form flex items-center justify-center min-h-screen mt-[-40px]">
        <div className="div-form p-8 w-full max-w-md">
          <h1 className="text-[20px] text-center mb-4">
            Bienvenido a ScienceUTM!
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="p-1 label-form">
                Correo
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="p-1 label-form">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="**********"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button className="button-submit-register w-40 py-2 rounded-[12px]">
                Inicia Sesión
              </button>
            </div>
            <div>
              <p className="text-[10px] text-center mt-5 text-[#4F7396]">
                ¿No tienes una cuenta?
              </p>
            </div>
            <div className="flex justify-center mt-5">
              <NavLink
                to="/register"
                className="w-40 py-2 rounded-[12px] text-center button-account-register"
              >
                Regístrate
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
