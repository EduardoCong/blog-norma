import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface FormularioArticulo {
  titulo: string;
  contenido: string;
  id_categoria: string | number;
  imagen_principal: string;
}

const CrearArticulo: React.FC = () => {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState<FormularioArticulo>({
    titulo: "",
    contenido: "",
    id_categoria: "",
    imagen_principal: "",
  });

  const handleChange = (campo: keyof FormularioArticulo, valor: string | number) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const fecha_publicacion = new Date().toLocaleDateString("sv-SE")

      const datosArticulo = {
        ...formulario,
        fecha_publicacion,
      };

      const response = await axios.post("http://localhost:4000/api2/crearArticulos", datosArticulo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Swal.fire("¡Publicado!", response.data.message, "success").then(() =>
        navigate("/home")
      );
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;
      const mensaje = axiosError.response?.data?.error || "Algo salió mal";
      Swal.fire("Error", mensaje, "error");
    }
  };

  useEffect(() => {
    document.title = "Crear Artículo - ScienceUTM";
  }, []);

  return (
    <motion.div
      className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Nuevo Artículo</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Título</label>
          <div className="border p-2 rounded">
            <input
              type="text"
              className="w-full outline-none"
              value={formulario.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold">Contenido</label>
          <div className="border p-2 rounded">
            <textarea
              className="w-full outline-none resize-none"
              rows={5}
              value={formulario.contenido}
              onChange={(e) => handleChange("contenido", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold">ID Categoría</label>
          <div className="border p-2 rounded">
            <input
              type="number"
              className="w-full outline-none"
              value={formulario.id_categoria}
              onChange={(e) => handleChange("id_categoria", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">URL de la imagen</label>
          <div className="border p-2 rounded">
            <input
              type="text"
              className="w-full outline-none"
              placeholder="https://example.com/imagen.jpg"
              value={formulario.imagen_principal}
              onChange={(e) => handleChange("imagen_principal", e.target.value)}
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          Publicar Artículo
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CrearArticulo;
