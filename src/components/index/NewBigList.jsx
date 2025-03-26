import React, { useState } from "react";
import LargeNewsCard from "../principals/LargeNewsCard";
import Modal from "react-modal";

Modal.setAppElement("#root");

function NewBigList() {
  const newBigs = [
    {
      imageUrl:
        "https://preview.redd.it/made-cyberpunk-city-with-building-in-style-of-gits-always-v0-tkrx8589oglb1.jpg?width=1080&crop=smart&auto=webp&s=440821af4ee57ab165a2428c24083744c1bee860",
      title: "Cyberpunk 2077",
      summary: "Resumen breve de la noticia 1",
      author: "Eduardo Cong",
      organization: "División Tics",
      content:
        "El texto ficticio conocido como Lorem ipsum ha sido un pilar en la industria de la impresión y la tipografía desde el siglo XVI...",
    },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [comments, setComments] = useState([]); // Nuevo estado para comentarios
  const [newComment, setNewComment] = useState(""); // Estado para comentario actual

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setModalIsOpen(true);
    setComments([]); // Limpia los comentarios al abrir una nueva noticia
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Manejar envío de comentarios
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment(""); // Limpiar input
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {newBigs.map((item, index) => (
          <div key={index} onClick={() => openModal(item)}>
            <LargeNewsCard key={index} title={item.title} imageUrl={item.imageUrl} isModal={false} />
          </div>
        ))}
      </div>

      {/* Modal para mostrar detalles y comentarios */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {selectedNews && (
          <div>
            <LargeNewsCard
              title={selectedNews.title}
              imageUrl={selectedNews.imageUrl}
              isModal={true}
            />
            <h2>{selectedNews.title}</h2>
            <p>Autor: {selectedNews.author}</p>
            <p>Organización: {selectedNews.organization}</p>
            <p>{selectedNews.content}</p>

            {/* Lista de comentarios */}
            <div>
              <h3>Comentarios:</h3>
              {comments.length === 0 ? (
                <p>No hay comentarios aún. ¡Sé el primero!</p>
              ) : (
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index} style={{ backgroundColor: "#f1f1f1", padding: "10px", marginBottom: "5px", borderRadius: "8px" }}>
                      {comment}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Formulario para agregar comentarios */}
            <form onSubmit={handleAddComment} style={{ marginTop: "20px" }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Agrega tu comentario aquí..."
                rows="3"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  resize: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "25px",
                  fontSize: "1.1em",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Agregar Comentario
              </button>
            </form>

            {/* Botón para cerrar el modal */}
            <button
              style={{
                backgroundColor: "#324A6E",
                color: "white",
                padding: "15px 30px",
                border: "none",
                borderRadius: "25px",
                fontSize: "1.2em",
                cursor: "pointer",
                marginTop: "20px",
              }}
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default NewBigList;
