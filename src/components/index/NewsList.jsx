import React, { useState } from "react";
import NewCard from "../principals/NewCard";
import Modal from "react-modal"; 

Modal.setAppElement("#root"); 

function NewsList() {
  const news = [
    {
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
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState(""); 

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setModalIsOpen(true);
    setComments([]);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Manejar envío de comentarios
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment(""); 
    }
  };

  return (
    <div>
      {/* Muestra la lista de noticias */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {news.map((item, index) => (
          <div key={index} onClick={() => openModal(item)}>
            <NewCard title={item.title} summary={item.summary} imageUrl={item.imageUrl} />
          </div>
        ))}
      </div>

      {/* Modal para mostrar detalles y comentarios */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {selectedNews && (
          <div>
            <img
              src={selectedNews.imageUrl}
              alt={selectedNews.title}
              style={{
                width: "80%",
                display: "block",
                margin: "20px auto",
                borderRadius: "10px",
              }}
            />
            <h2>{selectedNews.title}</h2>
            <p>Autor: {selectedNews.author}</p>
            <p>Organización: {selectedNews.organization}</p>
            <p>{selectedNews.content}</p>

            {/* Lista de comentarios */}
            <div style={{ marginTop: "20px" }}>
              <h3>Comentarios:</h3>
              {comments.length === 0 ? (
                <p>No hay comentarios aún. ¡Sé el primero!</p>
              ) : (
                <ul>
                  {comments.map((comment, index) => (
                    <li
                      key={index}
                      style={{
                        backgroundColor: "#f1f1f1",
                        padding: "10px",
                        marginBottom: "5px",
                        borderRadius: "8px",
                      }}
                    >
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

export default NewsList;
