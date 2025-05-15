import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';

const NavbarComponent = () => {
  const navigate = useNavigate();
  return (
<Navbar expand="lg" className="bg-primary shadow-sm">
  <Container fluid>
    <div className="d-flex gap-2 justify-content-start w-100">
      <Button 
        variant="primary" 
        size="sm" 
        onClick={() => navigate('/')} 
        style={{ color: 'white', border: 'none' }}
      >
        Home
      </Button>
      <Button 
        variant="primary" 
        size="sm" 
        onClick={() => navigate('/login')} 
        style={{ color: 'white', border: 'none' }}
      >
        Logout
      </Button>
    </div>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
  </Container>
</Navbar>
  );
};


export default NavbarComponent;