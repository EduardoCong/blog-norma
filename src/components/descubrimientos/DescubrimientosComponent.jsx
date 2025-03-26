import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';

function DescubrimientosComponent() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');

  const Descubirmientos = [
    {
      title: 'Última Noticia 1',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoERw7q9GVDxlAtQViYAtzxMsRtrg8v18Krg&s',
      description: 'Descripción de la noticia 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        title: 'Última Noticia 1',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoERw7q9GVDxlAtQViYAtzxMsRtrg8v18Krg&s',
        description: 'Descripción de la noticia 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },  {
        title: 'Última Noticia 1',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoERw7q9GVDxlAtQViYAtzxMsRtrg8v18Krg&s',
        description: 'Descripción de la noticia 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },  {
        title: 'Última Noticia 1',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoERw7q9GVDxlAtQViYAtzxMsRtrg8v18Krg&s',
        description: 'Descripción de la noticia 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },  {
        title: 'Última Noticia 1',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoERw7q9GVDxlAtQViYAtzxMsRtrg8v18Krg&s',
        description: 'Descripción de la noticia 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },  {
        title: 'Última Noticia 1',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoERw7q9GVDxlAtQViYAtzxMsRtrg8v18Krg&s',
        description: 'Descripción de la noticia 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
  ];

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewComment(''); // Limpiar el campo de comentario
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prevComments) => {
        const currentComments = prevComments[selectedItem.title] || [];
        return {
          ...prevComments,
          [selectedItem.title]: [...currentComments, newComment],
        };
      });
      setNewComment('');
    }
  };

  return (
    <Container className="mt-4 mb-4">
      <Row>
        {Descubirmientos.map((item, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card className="h-100 news-card" onClick={() => handleCardClick(item)}>
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title className="text-center">{item.title}</Card.Title>
                <Card.Text className="text-center" style={{ maxHeight: '100px', overflow: 'hidden' }}>
                  {item.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedItem?.imageUrl} alt={selectedItem?.title} style={{ width: '100%' }} />
          <p>{selectedItem?.description}</p>

          <h5>Comentarios:</h5>
          <ul>
            {comments[selectedItem?.title]?.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Deja tu comentario..."
            value={newComment}
            onChange={handleCommentChange}
          />
          <Button variant="primary" className="mt-3" onClick={handleAddComment}>
            Agregar comentario
          </Button>
        </Modal.Body>
      </Modal>

      <style type="text/css">
        {`
          .news-card {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            transition: transform 0.3s ease-in-out;
          }
  
          .news-card:hover {
            transform: translateY(-5px);
          }
        `}
      </style>
    </Container>
  );
}

export default DescubrimientosComponent;
