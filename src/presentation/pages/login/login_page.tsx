import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { userSchema } from "../../zodValidartion/zod_validation";

const emailSchema = userSchema.pick({ email: true });
const passwordSchema = userSchema.pick({ password: true });

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<FormErrors>({});
  const [shouldLogin, setShouldLogin] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const schemaToUse = name === "email" ? emailSchema : passwordSchema;
    const result = schemaToUse.safeParse({ [name]: value });

    if (!result.success) {
      const message =
        result.error.formErrors.fieldErrors[
          name as keyof typeof result.error.formErrors.fieldErrors
        ]?.[0] || `Error en ${name}`;
      setError((prev) => ({ ...prev, [name]: message }));
    } else {
      setError((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      userSchema.parse(formData);
      setError({});
      setShouldLogin(true);
    } catch (err) {
      console.error("Error en submit:", err);
    }
  };

  useEffect(() => {
    if (!shouldLogin) return;

    const loginUser = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo: formData.email,
            contraseña: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al iniciar sesión");
        }

        localStorage.setItem("correo", data.usuario.email);
        localStorage.setItem("nombre_usuario", data.usuario.nombre_usuario);
        localStorage.setItem("rol", data.usuario.id_autor);
        localStorage.setItem("token", data.usuario.token);
        localStorage.setItem("token_expires", data.usuario.token_expires);

        Swal.fire({
          icon: "success",
          title: "¡Inicio de sesión exitoso!",
          text: data.message || "Bienvenido de nuevo.",
          confirmButtonText: "Ir al Home",
        }).then(() => {
          navigate("/home");
        });
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: (error as Error).message || "Algo salió mal",
        });
      } finally {
        setShouldLogin(false);
      }
    };

    loginUser();
  }, [formData.email, formData.password, navigate, shouldLogin]);

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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="p-1 label-form">
                Correo
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="you@example.com"
              />
              {error.email && (
                <p className="text-red-500 text-xs mt-1">{error.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="p-1 label-form">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="**********"
              />
              {error.password && (
                <p className="text-red-500 text-xs mt-1">{error.password}</p>
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
