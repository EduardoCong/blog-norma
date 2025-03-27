import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

interface PerfilData {
  photoUrl: string;
  name: string;
  username: string;
}

const PerfilPage = () => {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);

  useEffect(() => {
    const perfilCache: PerfilData = {
      photoUrl: "/uploads/perfil.jpg",
      name: localStorage.getItem("nombre_usuario") || "Nombre",
      username: (localStorage.getItem("correo") || "correo").split("@")[0],
    };

    setPerfil(perfilCache);
  }, []);

  if (!perfil)
    return (
      <p className="text-center mt-10 text-gray-500">Cargando perfil...</p>
    );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-[#0A2540] px-6 py-4 flex justify-between items-center shadow">
        <div className="flex items-center space-x-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy8Zl8c4c8H1mmsKu2n5EFcrBd-cn8003_g&s"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-white font-bold text-sm">ScienceUTM</h1>
        </div>
        <div className="flex space-x-6 items-center">
          <NavLink to="/home" className="text-white hover:text-blue-300 transition">
            Inicio
          </NavLink>
          <NavLink to="/noticias" className="text-white hover:text-blue-300 transition">
            Noticias
          </NavLink>
          <NavLink to="/descubrimientos" className="text-white hover:text-blue-300 transition">
            Descubrimientos
          </NavLink>
          <NavLink to="/expertos" className="text-white hover:text-blue-300 transition">
            Expertos
          </NavLink>
        </div>
      </nav>

      {/* PERFIL */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 text-center">
          <img
            src={perfil.photoUrl}
            alt={`${perfil.name}'s profile`}
            className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg mb-4 border-4 border-[#0A192F]"
          />
          <h2 className="text-3xl font-bold text-[#0A192F]">{perfil.name}</h2>
          <p className="text-sm text-gray-600 mb-6">@{perfil.username}</p>

          {/* Botón */}
          <NavLink
            to="/crear-articulo"
            className="inline-block bg-[#019863] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#007f54] transition"
          >
            Crear nuevo artículo
          </NavLink>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A2540] text-white text-center py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm mb-2 md:mb-0">
            © All Rights Reserved. Blog Web Proyectos de Programación
          </p>
          <div className="flex space-x-4 text-xl">
            <NavLink to="#"><FontAwesomeIcon icon={faFacebook} /></NavLink>
            <NavLink to="#"><FontAwesomeIcon icon={faTwitter} /></NavLink>
            <NavLink to="#"><FontAwesomeIcon icon={faYoutube} /></NavLink>
            <NavLink to="#"><FontAwesomeIcon icon={faGithub} /></NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PerfilPage;