import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import "../../../index.css";
import {
  faTwitter,
  faFacebook,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const ScienceUTMHomepage = () => {
  interface Article {
    id_articulo: number;
    titulo?: string;
    contenido?: string;
    imagen_principal?: string;
  }

  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api2/articulos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        localStorage.setItem("id_articulo", data.id_articulo);

        if (Array.isArray(data)) {
          setNews(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
      } catch (err) {
        console.error("Error al cargar artículos:", err);
      }
    };

    fetchArticulos();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-white text-[#1A2B3C] font-torres"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="bg-[#0A2540] text-white shadow-md">
        <div className="px-4 py-2 flex justify-between items-center">
          <div className="flex justify-between items-center gap-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy8Zl8c4c8H1mmsKu2n5EFcrBd-cn8003_g&s"
              alt=""
              className="h-10 w-10"
            />
            <div>ScienceUTM</div>
            <div className="space-x-4 flex items-center">
              <NavLink
                to="/home"
                className="text-white hover:text-blue-300 transition"
              >
                Inicio
              </NavLink>
              <NavLink
                to="/noticias"
                className="text-white hover:text-blue-300 transition"
              >
                Noticias
              </NavLink>
              <NavLink
                to="/descubrimientos"
                className="text-white hover:text-blue-300 transition"
              >
                Descubrimientos
              </NavLink>
              <NavLink
                to="/expertos"
                className="text-white hover:text-blue-300 transition"
              >
                Expertos
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Buscar artículos"
                className="w-full px-2 py-1 rounded-full text-black focus:outline-none bg-gray-100 focus:ring-2 focus-search"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer hover:text-blue-600 transition">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
            <button className="bg-black text-white px-3 py-1 rounded-full transition hover:bg-[#ffffff] hover:text-black hover:cursor-pointer">
              Suscríbete
            </button>
            <div className="bg-gray-100 rounded-[15px] p-1 text-blue-500 hover:bg-gray-200 transition cursor-pointer h-7 w-10 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-6xl px-4 py-6 mt-5">
        <h2 className="text-3xl font-bold mb-2">ScienceUTM</h2>
        <p className="mb-6 text-gray-700 text-lg">
          Mantente informado con las últimas noticias y descubrimientos.
        </p>

        {news.length === 0 && (
          <p className="text-center text-gray-500">No hay artículos aún.</p>
        )}

        {news.length >= 4 && (
          <>
            {/* Noticia Principal tipo BBC */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="lg:col-span-2">
                <NavLink
                  to={`/articulos/${news[0].id_articulo}`}
                  className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {news[0].imagen_principal && (
                    <img
                      src={`/${news[0].imagen_principal}`}
                      alt={news[0].titulo}
                      className="w-full h-[350px] object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-2xl font-bold text-blue-800 hover:underline mb-2">
                      {news[0].titulo}
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {news[0].contenido}
                    </p>
                  </div>
                </NavLink>
              </div>

              {/* Noticia secundaria destacada */}
              <div className="flex flex-col gap-4">
                {news.slice(1, 3).map((n) => (
                  <NavLink
                    key={n.id_articulo}
                    to={`/articulos/${n.id_articulo}`}
                    className="flex gap-3 border rounded-lg overflow-hidden hover:shadow transition"
                  >
                    <div className="w-1/3">
                      <img
                        src={`/${n.imagen_principal}`}
                        alt={n.titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 w-2/3 flex flex-col justify-center">
                      <h4 className="text-md font-semibold text-blue-700 hover:underline">
                        {n.titulo}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {n.contenido}
                      </p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Último artículo adicional en forma horizontal */}
            <div className="mb-8">
              <NavLink
                to={`/articulos/${news[3].id_articulo}`}
                className="flex flex-col md:flex-row border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {news[3].imagen_principal && (
                  <img
                    src={`/${news[3].imagen_principal}`}
                    alt={news[3].titulo}
                    className="w-full md:w-[400px] h-[250px] object-cover"
                  />
                )}
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-blue-700 hover:underline mb-2">
                    {news[3].titulo}
                  </h3>
                  <p className="text-base text-gray-600">{news[3].contenido}</p>
                </div>
              </NavLink>
            </div>
          </>
        )}
      </main>

      <footer className="bg-[#0A2540] text-white text-center py-2 h-25 p-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0">
            © All Rights Reserved. Blog Web Proyectos de Programación
          </p>
          <div className="flex space-x-2 text-xl">
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
    </motion.div>
  );
};

export default ScienceUTMHomepage;
