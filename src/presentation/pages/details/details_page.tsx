import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faTwitter,
  faFacebook,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import '../../../index.css';

const ArticuloDetallePage = () => {
  interface Article {
    id_articulo: number;
    titulo?: string;
    contenido?: string;
    imagen_principal?: string;
  }

  interface Comentario {
    id_comentario: number;
    nombre_usuario: string;
    contenido: string;
    fecha_comentario: string;
  }

  const [articulo, setArticulo] = useState<Article | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchArticulo = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api2/articulos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setArticulo(data);
        } else {
          console.error("Error al obtener artículo:", data);
        }
      } catch (err) {
        console.error("Error de red al obtener artículo:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchComentarios = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api2/comentarios/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            validateStatus: () => true,
          }
        );

        if (Array.isArray(data)) {
          setComentarios(data);
        } else {
          setComentarios([]);
        }
      } catch (err) {
        console.error("Error al obtener comentarios:", err);
      }
    };

    fetchArticulo();
    fetchComentarios();
  }, [id]);

  const handleComentarioSubmit = async () => {
    if (!nuevoComentario.trim()) return;
    try {
      await axios.post(
        `http://localhost:4000/api2/comentarios/${id}`,
        {
          nombre_usuario: localStorage.getItem("nombre_usuario"),
          email_usuario: localStorage.getItem("correo"),
          contenido: nuevoComentario,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setComentarios((prev) => [
        ...prev,
        {
          id_comentario: Date.now(),
          nombre_usuario: localStorage.getItem("nombre_usuario") || "Anónimo",
          contenido: nuevoComentario,
          fecha_comentario: new Date().toISOString(),
        },
      ]);

      setNuevoComentario("");
    } catch (err) {
      console.error("Error al enviar comentario:", err);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-[#1A2B3C] font-torres flex flex-col"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4 }}
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

      <main className="px-6 py-10 max-w-[800px] mx-auto flex-1">
        {loading ? (
          <p className="text-center text-gray-500">Cargando artículo...</p>
        ) : articulo ? (
          <article className="space-y-6">
            <h1 className="text-4xl text-[#0A2540] leading-tight">
              {articulo.titulo || "Sin título"}
            </h1>
            {articulo.imagen_principal && (
              <img
                src={articulo.imagen_principal}
                alt={articulo.titulo}
                className="w-full h-150 rounded-lg shadow-md"
              />
            )}
            <p className="text-lg text-gray-700 leading-8 whitespace-pre-line">
              {articulo.contenido || "Sin contenido disponible."}
            </p>
          </article>
        ) : (
          <p className="text-center text-red-500">Artículo no encontrado.</p>
        )}

        <section className="mt-12">
          <h2 className="text-2xl text-[#1A2B3C] mb-4">Comentarios</h2>
          <div className="space-y-4">
            {comentarios.length > 0 ? (
              comentarios.map((comentario) => (
                <div key={comentario.id_comentario} className="border-b pb-3">
                  <p className="text-blue-800">
                    {comentario.nombre_usuario}
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(comentario.fecha_comentario).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {comentario.contenido}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No hay comentarios aún.</p>
            )}
          </div>

          <div className="mt-6">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Escribe tu comentario..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              rows={4}
            ></textarea>
            <button
              onClick={handleComentarioSubmit}
              className="mt-2 bg-[#0A2540] text-white px-4 py-2 rounded-full text-sm hover:bg-[#1C3A5F] transition cursor-pointer"
            >
              Enviar comentario
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-[#0A2540] text-white text-center py-6">
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

export default ArticuloDetallePage;