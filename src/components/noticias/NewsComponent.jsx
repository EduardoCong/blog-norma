import React, { useState } from "react";
import NewCard from "../principals/NewCard";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Asegúrate de que este elemento coincide con el ID de tu raíz

function NewsList() {
  const news = [
    {
      id: 1,
      title: "Última Noticia 1",
      summary: "Resumen breve de la noticia 1",
      imageUrl:
        "https://www.gamingprofessors.cz/wp-content/uploads/2021/01/Cyberpunk-2077-uvodni-obrazek.jpg",
      author: "Eduardo Cong",
      organization: "División Tics",
      content:
        "El texto ficticio conocido como Lorem ipsum ha sido un pilar en la industria de la impresión y la tipografía desde el siglo XVI...",
    },
    {
      id: 2,
      title: "Última Noticia 2",
      summary: "Resumen breve de la noticia 2",
      imageUrl:
        "https://www.gamingprofessors.cz/wp-content/uploads/2021/01/Cyberpunk-2077-uvodni-obrazek.jpg",
      author: "Eduardo Cong",
      organization: "División Tics",
      content:
        "El texto ficticio conocido como Lorem ipsum ha sido un pilar en la industria de la impresión y la tipografía desde el siglo XVI...",
    },
    {
      id: 3,
      title: "Última Noticia 3",
      summary: "Resumen breve de la noticia 3",
      imageUrl:
        "https://www.gamingprofessors.cz/wp-content/uploads/2021/01/Cyberpunk-2077-uvodni-obrazek.jpg",
      author: "Eduardo Cong",
      organization: "División Tics",
      content:
        "El texto ficticio conocido como Lorem ipsum ha sido un pilar en la industria de la impresión y la tipografía desde el siglo XVI...",
    },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  // Abrir modal y cargar la noticia seleccionada
  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setModalIsOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalIsOpen(false);
    setNewComment("");
  };

  // Manejar envío de comentario
  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      const newsId = selectedNews.id;
      const updatedComments = {
        ...comments,
        [newsId]: [...(comments[newsId] || []), newComment],
      };
      setComments(updatedComments);
      setNewComment("");
    }
  };

  return (
    <div>
      {/* Contenedor de las cards */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {news.map((item) => (
          <div className="news-card" key={item.id} onClick={() => openModal(item)} style={{ cursor: "pointer" }}>
            <NewCard title={item.title} summary={item.summary} imageUrl={item.imageUrl} />
          </div>
        ))}
      </div>

      {/* Modal para mostrar el contenido de la noticia y los comentarios */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "60%",
            margin: "auto",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#f4f4f4",
          },
        }}
      >
        {selectedNews && (
          <div>
            <img
              src={selectedNews.imageUrl}
              alt={selectedNews.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            />
            <h2>{selectedNews.title}</h2>
            <p><strong>Autor:</strong> {selectedNews.author}</p>
            <p><strong>Organización:</strong> {selectedNews.organization}</p>
            <p>{selectedNews.content}</p>

            {/* Sección de comentarios */}
            <div style={{ marginTop: "30px" }}>
              <h3>Comentarios</h3>
              {comments[selectedNews.id]?.length > 0 ? (
                comments[selectedNews.id].map((comment, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#e9ecef",
                      padding: "10px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {comment}
                  </div>
                ))
              ) : (
                <p>Aún no hay comentarios. Sé el primero en comentar.</p>
              )}
              {/* Formulario para agregar comentarios */}
              <textarea
                rows="3"
                placeholder="Escribe tu comentario aquí..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              />
              <button
                onClick={handleCommentSubmit}
                style={{
                  backgroundColor: "#324A6E",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Agregar Comentario
              </button>
            </div>

            {/* Botón para cerrar el modal */}
            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                backgroundColor: "#dc3545",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </Modal>
      <style type="text/css">
        {`
          .news-card {
            
            transition: transform 0.3s ease-in-out;
          }
  
          .news-card:hover {
            transform: translateY(-5px);
          }
        `}

      </style>
    </div>

  );
}

export default NewsList;
