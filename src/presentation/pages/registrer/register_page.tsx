import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  UserRegisterForm,
  userRegisterSchema,
} from "../../zodValidartion/register_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { getErrorMessage } from "../../../utils/errorHandler";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
    mode: "onBlur",
    defaultValues: {
      user: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserRegisterForm> = async (data) => {
    try {
      await axios.post("http://localhost:4000/api/register", {
        nombre_usuario: data.user,
        correo: data.email,
        contraseña: data.password,
      });

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Bienvenido a ScienceUTM.",
        timer: 900,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
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
              className="button-register px-4 py-2 rounded-[12px]"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "button-register-active px-4 py-2 rounded-[12px]"
                  : "button-register px-4 py-2 rounded-[12px]"
              }
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
            Registrate a ScienceUTM
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                {...register("user")}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="Username"
              />
              {errors.user && (
                <p className="text-red-500 text-xs mt-1">{errors.user.message}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                {...register("email")}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="password"
                {...register("password")}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="Contraseña"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="button-submit-register w-40 py-2 rounded-[12px]"
              >
                Registrate
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default RegisterPage;
