import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().nonempty({ message: "El nombre es requerido" }),
  email: z.string().nonempty({ message: "El email es requerido" }).email({ message: "Debe ser un email válido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

const nameSchema = registerSchema.pick({ name: true });
const emailSchema = registerSchema.pick({ email: true });
const passwordSchema = registerSchema.pick({ password: true });

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let schemaToUse;
    if (name === "name") {
      schemaToUse = nameSchema;
    } else if (name === "email") {
      schemaToUse = emailSchema;
    } else if (name === "password") {
      schemaToUse = passwordSchema;
    }
    if (schemaToUse) {
      const result = schemaToUse.safeParse({ [name]: value });
      if (!result.success) {
        const message = result.error.formErrors.fieldErrors[name as keyof typeof result.error.formErrors.fieldErrors]?.[0] || "Error en el campo";
        setErrors((prev) => ({ ...prev, [name]: message }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors({
        name: fieldErrors.name ? fieldErrors.name[0] : undefined,
        email: fieldErrors.email ? fieldErrors.email[0] : undefined,
        password: fieldErrors.password ? fieldErrors.password[0] : undefined,
      });
      return;
    }
    console.log("Datos válidos:", formData);
    setErrors({});
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
          <h1 className="text-[20px] text-center mb-4">Registrate a ScienceUTM</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="Nombre"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="input-form w-full px-4 py-2 rounded-[14px] focus:outline-none focus:ring-1 input-form-style"
                placeholder="Contraseña"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex justify-center">
              <button className="button-submit-register w-40 py-2 rounded-[12px]">
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default RegisterPage;
