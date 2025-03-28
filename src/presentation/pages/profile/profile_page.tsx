import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import { NavLink } from "react-router-dom";
import {
  faFacebook,
  faGithub,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

interface PerfilData {
  nombre_usuario: string;
  email: string;
  foto?: string;
  biografia?: string;
  password?: string;
}

const PerfilPage = () => {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      const id = localStorage.getItem("id_autor");
      const token = localStorage.getItem("token");
      if (!id || !token) return;
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api2/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPerfil(data.usuario);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      }
    };
    fetchPerfil();
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString();
      if (base64) {
        setImageBase64(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  if (!perfil)
    return (
      <p className="text-center mt-10 text-gray-500">Cargando perfil...</p>
    );

  return (
    <motion.main
      className="min-h-screen bg-[#F5F8FA]rounded-xl shadow-md font-jakarta"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="bg-[#0A2540] text-white shadow-md p-2">
        <div className="px-4 py-2 flex justify-between items-center">
          <div className="flex justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy8Zl8c4c8H1mmsKu2n5EFcrBd-cn8003_g&s"
                alt="logo"
                className="h-10 w-10"
              />
              <div className="text-lg">ScienceUTM</div>
            </div>
          </div>
        </div>
      </nav>

      <main className="m-10">
        <h2 className="text-2xl font-bold mb-6">Detalles personales</h2>

        <div className="flex justify-center">
          {perfil.foto || imageBase64 ? (
            <img
              src={imageBase64 || `/uploads/${perfil.foto}`}
              alt="Foto de perfil"
              className="w-32 h-32 object-cover rounded-full shadow-lg border"
            />
          ) : (
            <div
              {...getRootProps()}
              className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full text-center text-gray-500 cursor-pointer hover:bg-gray-100"
            >
              <input {...getInputProps()} />
              {isDragActive ? "Suelta la imagen" : "Subir imagen"}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Nombre de usuario</p>
            <p className="text-lg font-medium">{perfil.nombre_usuario}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Correo electrónico</p>
            <p className="text-lg font-medium">{perfil.email}</p>
          </div>

          <div className="border-b pb-3 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Contraseña</p>
              <p className="text-lg font-medium">
                {showPassword ? perfil.password || "**********" : "**********"}
              </p>
            </div>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <div className="pb-3 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Biografía</p>
              <p className="text-lg font-medium italic">
                {perfil.biografia ? (
                  `“${perfil.biografia}”`
                ) : (
                  <span className="text-gray-400">None set</span>
                )}
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <FontAwesomeIcon icon={perfil.biografia ? faPen : faPlus} />
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-[#0A2540] text-white text-center py-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm mb-2 md:mb-0">
            © Todos los derechos reservados. Blog académico ScienceUTM.
          </p>
          <div className="flex space-x-3 text-xl">
            <NavLink to="#">
              <FontAwesomeIcon icon={faFacebook} />
            </NavLink>
            <NavLink to="#">
              <FontAwesomeIcon icon={faTwitter} />
            </NavLink>
            <NavLink to="#">
              <FontAwesomeIcon icon={faYoutube} />
            </NavLink>
            <NavLink to="#">
              <FontAwesomeIcon icon={faGithub} />
            </NavLink>
          </div>
        </div>
      </footer>
    </motion.main>
  );
};

export default PerfilPage;
