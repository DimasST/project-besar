// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('kasir'); // Default to 'kasir'
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
        role
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Jika login berhasil
      if (response.data.success) {
        if (role === 'admin') {
          navigate('/homeadmin');
        } else {
          navigate('/homekasir');
        }
      } else {
        // Jika login gagal, tampilkan pesan dari backend
        setError(response.data.message || 'Login gagal');
      }
    } catch (err) {
      // Menangani error lain
      setError('Username/Password/Role salah');
      console.error('Login error:', err);
    }
  };
  
  
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
        <Card.Body>
          <h3 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#fff' }}>Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="text-left" style={{ color: '#fff' }}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text-left" style={{ color: '#fff' }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-3"
              />
            </Form.Group>

            {/* Radio buttons for role selection */}
            <Form.Group controlId="formRole">
              <Form.Label className="text-left" style={{ color: '#fff' }}></Form.Label>
              <div className="d-flex justify-content-between">
                <Form.Check
                  type="radio"
                  id="roleKasir"
                  name="role"
                  label="Kasir"
                  value="kasir"
                  checked={role === 'kasir'}
                  onChange={() => setRole('kasir')}
                  className="mb-2"
                  style={{ color: '#fff' }} // White text color
                />
                <Form.Check
                  type="radio"
                  id="roleAdmin"
                  name="role"
                  label="Admin"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="mb-2"
                  style={{ color: '#fff' }} // White text color
                />
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" size="lg">
              Login
            </Button>
          </Form>
        </Card.Body>
        
        <Button 
          variant="outline-light" 
          size="sm" 
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            marginLeft: '10px',
          }}
        >
          Back
        </Button>
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
  backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slight dark overlay to make the card more visible
  zIndex: 1,
};

const cardStyle = {
  zIndex: 2,
  maxWidth: '400px',
  width: '100%',
  borderRadius: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Very transparent middle
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',  // Soft shadow for card visibility
  border: '1px solid rgba(255, 255, 255, 0.5)', // More visible border to highlight edges
  position: 'relative',
};

export default LoginForm;
