import React from "react";

function NewCard({ title,summary, imageUrl,author,organization,content }) {
  return (
    <div style={{
      width: '300px',
      margin: '20px',
      backgroundColor: 'white', // Fondo blanco
      borderRadius: '10px', // Bordes redondeados
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra ligera
      overflow: 'hidden' // Para que la imagen no se salga de los bordes redondeados
    }}>
      <img
        src={imageUrl}
        alt={title}
        style={{
          width: '100%',
          height: 'auto', // Altura automática para mantener la proporción
          borderTopLeftRadius: '10px', // Bordes redondeados en la parte superior
          borderTopRightRadius: '10px'
        }}
      />
      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontSize: '1.5em', // Tamaño de fuente más grande
          fontWeight: 'bold', // Negrita
          marginBottom: '10px' // Margen inferior
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '0.9em', // Tamaño de fuente más pequeño
          color: '#333', // Tono gris oscuro
          marginBottom: '15px' // Margen inferior
        }}>
          {content}
        </p>
      </div>
    </div>
  );
}

export default NewCard;