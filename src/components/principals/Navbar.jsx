import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaUpload, FaUser } from 'react-icons/fa';

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: '#0A192F',
      color: 'white',
    }}>
      <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
        ScienceUTM
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/noticias" style={{ color: 'white', textDecoration: 'none' }}>Noticias</Link>
        <Link to="/descubrimientos" style={{ color: 'white', textDecoration: 'none' }}>Descubrimientos</Link>
        <Link to="/expertos" style={{ color: 'white', textDecoration: 'none' }}>Expertos</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type='text' placeholder='Search' style={{
          padding: '8px',
          backgroundColor: 'white',
          border: '1px solid #4A6572',
          color: 'black',
          borderRadius: '5px'
        }} />
        <button style={{
          padding: '8px 15px',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}>Suscríbete</button>

        <Link to="/uploadnews">
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <FaUpload color="#1C160C" />
          </div>
        </Link>

        <Link to="/profile">
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'white', // Círculo gris claro
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <FaUser color="#1C160C" />
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;