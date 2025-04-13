import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import { usePostArticleController } from "../../controllers/modalController";
import { categoriasDisponibles } from "../../../utils/categorys";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormPostArticle } from "../../../domain/models/articles";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../zodValidation/postArticle_validation";

const CrearArticuloModal = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormPostArticle>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      titulo: "",
      contenido: "",
      id_categoria: 0,
      imagen_principal: "",
    },
  });

  const imagen = watch("imagen_principal");

  const {
    onSubmit,
    handleFileChange,
    handleEtiquetaKeyDown,
    labels,
    inputLabel,
    setInputLabel,
  } = usePostArticleController();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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

          <form
            onSubmit={handleSubmit((data) => onSubmit(data, onClose))}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-gray-600 mb-1">Título</label>
              <input
                type="text"
                {...register("titulo")}
                placeholder="Ingresa el título de tu artículo"
                className="w-full border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.titulo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.titulo.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Categoría
              </label>
              <select
                {...register("id_categoria", { valueAsNumber: true })}
                className="w-full border rounded-lg px-3 py-1.5 text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none font-jakarta"
              >
                <option value="" className="font-jakarta">Selecciona una categoría</option>
                {categoriasDisponibles.map((cat) => (
                  <option key={cat.id} value={cat.id} className="font-jakarta">
                    {cat.nombre}
                  </option>
                ))}
              </select>
              {errors.id_categoria && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.id_categoria.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Contenido
              </label>
              <textarea
                {...register("contenido")}
                rows={5}
                placeholder="Escribe tu noticia..."
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.contenido && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contenido.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Imagen destacada
              </label>
              <div className="w-full border-2 border-dashed rounded-lg p-6 text-center text-gray-500 flex flex-col items-center justify-center hover:border-blue-400 transition cursor-pointer">
                <FaCloudUploadAlt className="text-3xl mb-2" />
                <p className="mb-2">Arrastra y suelta tu imagen o</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                  onChange={(e) => handleFileChange(e, setValue)}
                />
                <label htmlFor="fileInput" className="cursor-pointer group">
                  {imagen ? (
                    <img
                      src={imagen}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg border shadow group-hover:brightness-75 transition"
                    />
                  ) : (
                    <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-lg border border-dashed cursor-pointer hover:bg-gray-200 transition">
                      <FaCloudUploadAlt className="text-3xl text-gray-500" />
                    </div>
                  )}
                </label>
              </div>
              {errors.imagen_principal && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.imagen_principal.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Etiquetas
              </label>
              <input
                type="text"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
                onKeyDown={handleEtiquetaKeyDown}
                placeholder="Ingresa etiquetas"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {labels.map((tag, i) => (
                  <span
                    key={i}
                    className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border text-gray-700 hover:bg-[#B70808FF] hover:text-white transition hover:cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md border text-gray-700 flex items-center gap-2 hover:bg-[#17AD21FF] hover:text-white transition hover:cursor-pointer"
              >
                Subir noticia
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CrearArticuloModal;