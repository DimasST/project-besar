import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeComponent = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: 'url(https://cdna.artstation.com/p/assets/images/images/047/142/060/original/darius-anton-coffee-01.gif?1646856903)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="overlay" style={overlayStyle}></div>
      <Card className="text-center p-5" style={cardStyle}>
        <h1 className="mb-4" style={{ fontWeight: 'bold', color: '#fff' }}>Selamat Datang di Coffee Shop</h1>
        <Row className="mt-4">
          <Col>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/login')}
              className="shadow-lg"
              style={buttonStyle}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Slight dark overlay to make the card more visible
  zIndex: 1,
};

const cardStyle = {
  zIndex: 2,
  maxWidth: '500px',
  width: '100%',
  borderRadius: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Very transparent middle
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',  // Soft shadow for card visibility
  border: '1px solid rgba(255, 255, 255, 0.5)', // More visible border to highlight edges
};



const buttonStyle = {
  backgroundColor: '#007bff', // Blue background for the buttons
  borderColor: '#007bff',     // Matching border color
  color: '#fff',              // White text color for contrast
};

export default HomeComponent;
