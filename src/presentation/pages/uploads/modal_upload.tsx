import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

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

const CrearArticuloModal = ({ onClose }: { onClose: () => void }) => {
  const [formulario, setFormulario] = useState<FormularioArticulo>({
    titulo: "",
    contenido: "",
    id_categoria: "",
    imagen_principal: "",
  });

  const [etiquetas, setEtiquetas] = useState<string[]>([]);
  const [inputEtiqueta, setInputEtiqueta] = useState<string>("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
  
    return () => {
      document.body.style.overflow = "auto";
    };
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

      const response = await axios.post(
        "http://localhost:4000/uploads/crearArticulos",
        datosArticulo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("¡Publicado!", response.data.message, "success").then(onClose);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString();
        if (base64) {
          handleChange("imagen_principal", base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <AnimatePresence>
      <motion.div
        className="font-jakarta fixed inset-0 z-50 bg-gradient-to-r from-black/40 via-transparent to-black/40 flex justify-center items-center backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-md w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto shadow-lg"
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl text-gray-800 mb-6">Sube tu noticia</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Titulo</label>
              <input
                type="text"
                value={formulario.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                placeholder="Ingresa el título de tu artículo"
                className="w-full border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Categoria</label>
              <select
                value={formulario.id_categoria}
                onChange={(e) => handleChange("id_categoria", e.target.value)}
                className="w-full border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Selecciona una categoria</option>
                {categoriasDisponibles.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Contenido</label>
              <textarea
                value={formulario.contenido}
                onChange={(e) => handleChange("contenido", e.target.value)}
                rows={5}
                placeholder="Escribe tu noticia..."
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Imagen destacada</label>
              <div className="w-full border-2 border-dashed rounded-lg p-6 text-center text-gray-500 flex flex-col items-center justify-center hover:border-blue-400 transition cursor-pointer">
                <FaCloudUploadAlt className="text-3xl mb-2" />
                <p className="mb-2">Arrasta y suelta tu imagen o</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileInput"
                  className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded cursor-pointer text-sm"
                >
                  Sube una imagen
                </label>
                {formulario.imagen_principal && (
                  <img
                    src={formulario.imagen_principal}
                    alt="Preview"
                    className="mt-4 rounded-lg max-h-40 object-cover"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Etiquetas</label>
              <input
                type="text"
                value={inputEtiqueta}
                onChange={(e) => setInputEtiqueta(e.target.value)}
                onKeyDown={handleEtiquetaKeyDown}
                placeholder="Ingresa etiquetas"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {etiquetas.map((tag, i) => (
                  <span key={i} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border text-gray-700 hover:bg-[#B70808FF] hover:text-white transition hover:cursor-pointer"
              >
                Cancelar
              </button>
              <button   
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md border text-gray-700 flex items-center gap-2 hover:bg-[#17AD21FF] hover:text-white transition hover:cursor-pointer"
              >
                <FaPaperPlane /> Subir noticia
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CrearArticuloModal;
