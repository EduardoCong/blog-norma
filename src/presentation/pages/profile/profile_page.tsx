import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPen, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import { NavLink } from "react-router-dom";
import "../../../index.css";
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
  const [newPassword, setNewPassword] = useState("");
  const [editandoBio, setEditandoBio] = useState(false);
  const [nuevaBio, setNuevaBio] = useState("");

  useEffect(() => {
    const fetchPerfil = async () => {
      const id = localStorage.getItem("id_autor");
      const token = localStorage.getItem("token");

      if (!id || !token) return;

      try {
        const { data } = await axios.get(
          `http://localhost:4000/api2/usersAutor/${id}`,
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
        actualizarFotoPerfil(base64);
      }
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const actualizarFotoPerfil = async (base64: string) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id_autor");

    try {
      const res = await axios.post(
        `http://localhost:4000/uploads/users/${id}`,
        { foto_perfil: base64 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const secureUrl = res.data.secure_url;
      localStorage.setItem("foto_perfil", secureUrl);
      setPerfil((prev) => (prev ? { ...prev, foto: secureUrl } : prev));
      console.log("Imagen actualizada en DB");
    } catch (error) {
      console.error("Error al subir imagen:", error);
    }
  };

  const handleGuardarPassword = async () => {
    const id = localStorage.getItem("id_autor");
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:4000/api2/users/${id}`,
        { contrasena: newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowPassword(false);
      setNewPassword("");
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
    }
  };

  const actualizarBiografia = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id_autor");

    try {
      await axios.put(
        `http://localhost:4000/api2/users/${id}`,
        { biografia: nuevaBio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPerfil((prev) => (prev ? { ...prev, biografia: nuevaBio } : prev));
      setEditandoBio(false);
    } catch (error) {
      console.error("Error actualizando biografía:", error);
    }
  };

  if (!perfil)
    return (
      <p className="text-center mt-10 text-gray-500">Cargando perfil...</p>
    );

  return (
    <motion.main
      className="min-h-screen bg-[#F5F8FA] rounded-xl shadow-md font-jakarta flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="bg-[#0A2540] text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <NavLink
            to="/home"
            className="text-white hover:text-blue-300 transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Volver al inicio
          </NavLink>
          <div className="flex justify-between items-center gap-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy8Zl8c4c8H1mmsKu2n5EFcrBd-cn8003_g&s"
              alt=""
              className="h-10 w-10"
            />
            <div className="text-lg">ScienceUTM</div>
          </div>
        </div>
      </nav>

      <main className="m-10 flex-2">
        <h2 className="text-2xl mb-6">Detalles personales</h2>

        <div className="flex justify-center items-center gap-6 mb-6">
          {perfil.foto || localStorage.getItem("foto_perfil") ? (
            <div {...getRootProps()}>
              <img
                src={perfil.foto || localStorage.getItem("foto_perfil") || ""}
                alt="Foto de perfil"
                className="w-60 h-60 object-cover rounded-full shadow-lg border hover:cursor-pointer"
              />
              <input {...getInputProps()} />
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full text-center text-gray-500 cursor-pointer hover:bg-gray-100"
            >
              <input {...getInputProps()} />
              {isDragActive ? "Suelta la imagen" : "Subir imagen"}
            </div>
          )}

          <NavLink
            to="/crear-articulo"
            className="group flex flex-col items-center transition-transform hover:scale-105 duration-300"
          >
            <div className="w-40 h-40 flex items-center justify-center bg-[#0A2540] text-white rounded-full shadow-md">
              <FontAwesomeIcon icon={faUpload} className="text-[64px]" />
            </div>
            <span className="mt-2 text-sm text-gray-700 group-hover:text-[#0A2540] transition-colors duration-300">
              Subir artículo
            </span>
          </NavLink>
        </div>

        <div className="space-y-6">
          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Nombre de usuario</p>
            <p className="text-lg">{perfil.nombre_usuario}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Correo electrónico</p>
            <p className="text-lg">{perfil.email}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Contraseña</p>
            {showPassword ? (
              <div className="flex items-center justify-between gap-4">
                <input
                  type="password"
                  className="border p-2 rounded-lg text-sm w-full"
                  placeholder="Nueva contraseña"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleGuardarPassword}
                    className="h-9 w-20 bg-black rounded-[12px] text-[12px] text-white hover:cursor-pointer hover:bg-green-800"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setShowPassword(false)}
                    className="h-9 w-20 bg-black rounded-[12px] text-[12px] text-white hover:cursor-pointer hover:bg-red-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg">**********</p>
                <button
                  onClick={() => setShowPassword(true)}
                  className="text-[0a192f] hover:text-blue-800"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            )}
          </div>

          <div className="pb-3">
            <p className="text-sm text-gray-500">Biografía</p>
            {editandoBio ? (
              <div className="flex items-center justify-between gap-4">
                <textarea
                  rows={2}
                  className="border p-2 rounded-lg text-sm w-full"
                  placeholder="Agrega una biografía"
                  value={nuevaBio}
                  onChange={(e) => setNuevaBio(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={actualizarBiografia}
                    className="h-9 w-20 bg-black rounded-[12px] text-[12px] text-white hover:bg-green-800"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoBio(false)}
                    className="h-9 w-20 bg-black rounded-[12px] text-[12px] text-white hover:bg-red-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg italic text-gray-800">
                  {perfil.biografia ? `“${perfil.biografia}”` : "None set"}
                </p>
                <button
                  onClick={() => {
                    setEditandoBio(true);
                    setNuevaBio(perfil.biografia || "");
                  }}
                  className="text-[0a192f] hover:text-blue-800"
                >
                  <FontAwesomeIcon icon={perfil.biografia ? faPen : faPlus} />
                </button>
              </div>
            )}
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
