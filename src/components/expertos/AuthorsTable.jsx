import React, { useState } from "react";
import Modal from "react-modal";

// Configura el modal para evitar errores de accesibilidad
Modal.setAppElement("#root");

function AuthorsTable() {
  // Lista de autores
  const authors = [
    {
      id: 1,
      name: "Eduardo Cong",
      registrationDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Ana Martinez",
      registrationDate: "2023-11-22",
    },
    {
      id: 3,
      name: "Javier Pérez",
      registrationDate: "2024-02-10",
    },
    {
      id: 4,
      name: "María López",
      registrationDate: "2023-12-01",
    },
  ];

  // Estado para controlar el modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  // Abre el modal y establece el autor seleccionado
  const openModal = (author) => {
    setSelectedAuthor(author);
    setModalIsOpen(true);
  };

  // Cierra el modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAuthor(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Listado de Autores 📚</h2>

      {/* Tabla de autores */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#324A6E", color: "white" }}>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Fecha de Registro</th>
            <th style={styles.th}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id} style={styles.tr}>
              <td style={styles.td}>{author.name}</td>
              <td style={styles.td}>{author.registrationDate}</td>
              <td style={styles.td}>
                <button
                  style={styles.button}
                  onClick={() => openModal(author)}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para mostrar información del autor */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Detalles del Autor"
      >
        {selectedAuthor && (
          <div style={{ textAlign: "center" }}>
            <h2>Detalles del Autor ✍️</h2>
            <p>
              <strong>Nombre:</strong> {selectedAuthor.name}
            </p>
            <p>
              <strong>Fecha de Registro:</strong> {selectedAuthor.registrationDate}
            </p>
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                fontSize: "1em",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

// Estilos de la tabla
const styles = {
  th: {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
  },
  tr: {
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

// Estilos personalizados para el modal
const customModalStyles = {
  content: {
    width: "400px",
    height: "250px",
    margin: "auto",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  },
};

export default AuthorsTable;
