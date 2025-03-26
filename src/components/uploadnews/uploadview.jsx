import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Uploadview = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagenPrincipal, setImagenPrincipal] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
    formData.append('fecha_publicacion', new Date().toISOString());
    formData.append('id_categoria', 1); 
    formData.append('imagen_principal', imagenPrincipal);

    try {
      const response = await axios.post('api2/crearArticulos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      alert('Artículo publicado');
    } catch (error) {
      console.error(error);
      alert('Error al publicar el artículo');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Crea tu propia noticia</h2>

              <form onSubmit={handleSubmit}>
                {/* Campo de título */}
                <div className="mb-3">
                  <label className="form-label">Write a title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe un título..."
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>

                {/* Campo de contenido */}
                <div className="mb-3">
                  <label className="form-label">Contenido</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Escribe el contenido aquí..."
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                  ></textarea>
                </div>

                {/* Vista previa de las imágenes (inicialmente oculta) */}
                <div id="imagePreviewContainer" className="mb-3" style={{ display: 'none' }}>
                  <div id="imagePreview1Container" className="mb-3" style={{ display: 'none' }}>
                    <img id="imagePreview1" src="" alt="Image Preview 1" className="img-fluid rounded" />
                    <div className="mt-2">
                      <button onClick={() => removeImage(1)} className="btn btn-danger me-2">Remove</button>
                      <button onClick={() => replaceImage(1)} className="btn btn-success">Edit</button>
                    </div>
                  </div>

                  <div id="imagePreview2Container" className="mb-3" style={{ display: 'none' }}>
                    <img id="imagePreview2" src="" alt="Image Preview 2" className="img-fluid rounded" />
                    <div className="mt-2">
                      <button onClick={() => removeImage(2)} className="btn btn-danger me-2">Remove</button>
                      <button onClick={() => replaceImage(2)} className="btn btn-success">Edit</button>
                    </div>
                  </div>
                  <button id="uploadAnotherBtn" className="btn btn-success" style={{ display: 'none' }}>Subir otra</button>
                </div>

                {/* Subir Imagen */}
                <div className="mb-3">
                  <input type="file" id="fileInput" className="d-none" accept="image/*" onChange={(e) => setImagenPrincipal(e.target.files[0])} />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    Upload image
                  </button>
                </div>

                {/* Botón de "Post" */}
                <div className="text-center">
                  <button type="submit" className="btn btn-success">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploadview;