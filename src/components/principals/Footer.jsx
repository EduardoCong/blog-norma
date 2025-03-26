import React from "react";
import { FaFacebook, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa'; // Importar iconos

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0A192F', // Color de fondo oscuro
      padding: '20px',
      color: 'white', // Color de texto blanco
      display: 'flex', // Usar flexbox para alinear elementos
      justifyContent: 'space-between', // Espacio entre texto e iconos
      alignItems: 'center' // Alinear verticalmente
    }}>
      <p style={{ textAlign: 'left' }}>© All Rights Reserved. Blog Web Proyectos de Programación</p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <FaFacebook size={24} />
        <FaTwitter size={24} />
        <FaYoutube size={24} />
        <FaGithub size={24} />
      </div>
    </footer>
  );
}

export default Footer;