import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface FormularioArticulo {
  titulo: string;
  contenido: string;
  id_categoria: string | number;
  imagen_principal: string;
}

const categoriasDisponibles = [
  { id: 1, nombre: "Ciencia" },
  { id: 2, nombre: "Tecnología" },
  { id: 3, nombre: "Medio Ambiente" },
  { id: 4, nombre: "Astronomía" },
  { id: 5, nombre: "Biología" },
];

const CrearArticulo = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState<FormularioArticulo>({
    titulo: "",
    contenido: "",
    id_categoria: "",
    imagen_principal: "",
  });

  const [etiquetas, setEtiquetas] = useState<string[]>([]);
  const [inputEtiqueta, setInputEtiqueta] = useState<string>("");

  useEffect(() => {
    document.title = "Nuevo Artículo | ScienceUTM";
  }, []);

  const handleChange = (campo: keyof FormularioArticulo, valor: string | number) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const fecha_publicacion = new Date().toLocaleDateString("sv-SE");

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

      Swal.fire("¡Publicado!", response.data.message, "success").then(() => navigate("/home"));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire("Error", "Algo salió mal al publicar el artículo", "error");
    }
  };

  const handleEtiquetaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputEtiqueta.trim()) {
      e.preventDefault();
      setEtiquetas((prev) => [...prev, inputEtiqueta.trim()]);
      setInputEtiqueta("");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col justify-between font-jakarta"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="bg-[#0A2540] text-white shadow-md p-4">
        <div className="flex items-center gap-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy8Zl8c4c8H1mmsKu2n5EFcrBd-cn8003_g&s"
            className="h-10 w-10"
            alt="logo"
          />
          <div className="text-lg font-bold">ScienceUTM</div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          <div className="absolute top-0 left-0 w-full h-28 rounded-t-2xl bg-cover bg-center" style={{ backgroundImage: 'url("https://img.freepik.com/vector-gratis/fondo-galaxia-colorido_23-2148972702.jpg")' }}></div>
          <div className="pt-32 pb-10 px-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-center mb-6 text-[#0A2540]">Nuevo Artículo</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm text-gray-700">Título</label>
                  <input
                    type="text"
                    value={formulario.titulo}
                    onChange={(e) => handleChange("titulo", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-700">Contenido</label>
                  <textarea
                    value={formulario.contenido}
                    onChange={(e) => handleChange("contenido", e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-700">Categoría</label>
                  <select
                    value={formulario.id_categoria}
                    onChange={(e) => handleChange("id_categoria", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categoriasDisponibles.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-700">URL de la imagen principal</label>
                  <input
                    type="text"
                    value={formulario.imagen_principal}
                    onChange={(e) => handleChange("imagen_principal", e.target.value)}
                    placeholder="https://example.com/imagen.jpg"
                    className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-700">Etiquetas</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {etiquetas.map((tag, i) => (
                      <motion.span
                        key={i}
                        className="text-white bg-[#0A2540] px-3 py-1 rounded-full text-sm"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={inputEtiqueta}
                    onChange={(e) => setInputEtiqueta(e.target.value)}
                    onKeyDown={handleEtiquetaKeyDown}
                    placeholder="Presiona Enter para agregar"
                    className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={handleSubmit}
                className="mt-6 w-full bg-[#0A2540] text-white py-2 rounded-md text-lg font-semibold hover:bg-red-600 transition"
              >
                Publicar Artículo
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A2540] text-white text-center py-6">
        <div className="text-sm">
          © Todos los derechos reservados. Blog académico ScienceUTM.
        </div>
      </footer>
    </motion.div>
  );
};

export default CrearArticulo;