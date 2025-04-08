import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useArticuloDetalleController } from "../../controllers/detailsPageController";
import SpinnerLoader from "../../components/spinnerLoading";

const ArticuloDetallePage = () => {

  const {
    article,
    comments,
    loading,
    newComment,
    setNewComment,
    handleComentarioSubmit,
    navigate,
  } = useArticuloDetalleController();

  if (loading)
    return <SpinnerLoader />;

  return (
    <motion.div
      className="min-h-screen bg-white text-[#1A2B3C] font-torres flex flex-col"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Header showBackButton onBackButtonClick={()=>navigate(-1)}></Header>

      <main className="px-6 py-10 max-w-[800px] mx-auto flex-1">
        {loading ? (
          <p className="text-center text-gray-500">Cargando artículo...</p>
        ) : article ? (
          <article className="space-y-6">
            <h1 className="text-4xl text-[#0A2540] leading-tight">
              {article.titulo || "Sin título"}
            </h1>
            {article.imagen_principal && (
              <img
                src={article.imagen_principal}
                alt={article.titulo}
                className="w-full h-150 rounded-lg shadow-md"
              />
            )}
            <p className="text-lg text-gray-700 leading-8 whitespace-pre-line">
              {article.contenido || "Sin contenido disponible."}
            </p>
          </article>
        ) : (
          <Navigate to="/notfound"/>
        )}

        <section className="mt-12">
          <h2 className="text-2xl text-[#1A2B3C] mb-4">Comentarios</h2>
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id_comentario} className="border-b pb-3">
                  <p className="text-blue-800">
                    {comment.nombre_usuario}
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(comment.fecha_comentario).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {comment.contenido}
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
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
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

      <Footer></Footer>
    </motion.div>
  );
};

export default ArticuloDetallePage;