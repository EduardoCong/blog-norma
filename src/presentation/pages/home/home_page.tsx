import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "../../../index.css";

const ScienceUTMHomepage = () => {
  interface Article {
    id_articulo: number;
    titulo?: string;
    contenido?: string;
    imagen_principal?: string;
    fecha_publicacion?: string;
  }

  const [news, setNews] = useState<Article[]>([]);
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const getImageSrc = (url?: string) => {
    if (!url) return "";
    return url.startsWith("http")
      ? url
      : `http://localhost:4000/uploads/${url}`;
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api2/articulos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          const reversed = data.reverse();
          setNews(reversed);
          setFilteredNews(reversed);
        }
      } catch (err) {
        console.error("Error al cargar artículos:", err);
      }
    };
    fetchArticulos();
  }, []);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredNews(news);
      } else {
        const filtered = news.filter(
          (a) =>
            a.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.contenido?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNews(filtered);
      }
    }, 400);
  }, [searchTerm, news]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col font-torres"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="bg-[#0A2540] text-white shadow-md p-2">
        <div className="px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <NavLink to="/home">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy8Zl8c4c8H1mmsKu2n5EFcrBd-cn8003_g&s"
                alt="logo"
                className="h-10 w-10"
              />
            </NavLink>
            <div className="text-lg">ScienceUTM</div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar artículo..."
                className="w-60 pl-10 pr-4 py-2 rounded-[13px] bg-gray-100 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 flex items-center justify-center bg-white text-[#0A2540] border border-gray-200 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-800 transition hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white shadow-lg text-sm z-50 rounded-md overflow-hidden"
                  >
                    <NavLink
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-800 hover:bg-[#0a192f] hover:text-white"
                    >
                      Perfil
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-[#0a192f] text-red-600 hover:text-white"
                    >
                      Cerrar sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-6xl px-10 py-10 flex-2">
        <h2 className="text-3xl mb-2 font-jakarta">ScienceUTM</h2>
        <p className="mb-6 text-gray-700 text-lg">
          Mantente informado con las últimas noticias y descubrimientos.
        </p>

        {filteredNews.length === 0 ? (
          <p className="text-center text-gray-500">
            No se encontraron artículos.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {filteredNews.slice(1, 4).map((articulo) => (
                <NavLink
                  key={articulo.id_articulo}
                  to={`/articulos/${articulo.id_articulo}`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <img
                    src={getImageSrc(articulo.imagen_principal)}
                    alt={articulo.titulo}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base text-[#0A2540] mb-1 break-words whitespace-normal">
                      {articulo.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {articulo.contenido}
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>

            <NavLink to={`/articulos/${filteredNews[0].id_articulo}`}>
              <div className="mb-8 transition bg-white rounded-lg overflow-hidden hover:cursor-pointer">
                <img
                  src={getImageSrc(filteredNews[0].imagen_principal)}
                  alt={filteredNews[0].titulo}
                  className="w-full h-[500px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-2xl text-[#0A2540] mb-2">
                    {filteredNews[0].titulo}
                  </h3>
                  <p className="text-base text-gray-700">
                    {filteredNews[0].contenido}
                  </p>
                </div>
              </div>
            </NavLink>
          </>
        )}
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
    </motion.div>
  );
};

export default ScienceUTMHomepage;
