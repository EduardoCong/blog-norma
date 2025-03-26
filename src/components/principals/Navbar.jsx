import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaUpload, FaUser } from 'react-icons/fa';
import '/src/App.css';

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
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/noticias" className="nav-link">Noticias</Link>
        <Link to="/descubrimientos" className="nav-link">Descubrimientos</Link>
        <Link to="/expertos" className="nav-link">Expertos</Link>
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
            backgroundColor: 'white',
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