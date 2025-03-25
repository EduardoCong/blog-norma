import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      const result = emailSchema.safeParse({ email: value });
      if (!result.success) {
        const message =
          result.error.formErrors.fieldErrors.email?.[0] || "Error en email";
        setError((prev) => ({ ...prev, email: message }));
      } else {
        setError((prev) => ({ ...prev, email: undefined }));
      }
    }
    if (name === "password") {
      const result = passwordSchema.safeParse({ password: value });
      if (!result.success) {
        const message =
          result.error.formErrors.fieldErrors.password?.[0] ||
          "Error en password";
        setError((prev) => ({ ...prev, password: message }));
      } else {
        setError((prev) => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      userSchema.parse(formData);
      console.log("Datos válidos:", formData);
      setError({});
    } catch (err) {
      console.error("Error en submit:", err);
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
            <NavLink to="/" className="button-register px-4 py-2 rounded-[12px]">
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
              <button
                type="submit"
                className="button-submit-register w-40 py-2 rounded-[12px]"
              >
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
