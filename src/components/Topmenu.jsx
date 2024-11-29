import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Topmenu.css'; 

const Topmenu = () => {
  const mycart = useSelector((state) => state.mycart.cart);
  const navigate = useNavigate();

  const cartLen = mycart.length;
  
  // States for handling modal visibility and form data
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminData, setAdminData] = useState(null); // To store admin data from the API

  // Fetch admin credentials on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/admin')
      .then(response => {
        setAdminData(response.data); // Assume the response contains { username: 'admin', password: 'password' }
      })
      .catch(error => {
        console.error("Error fetching admin data:", error);
      });
  }, []);

  const cartPage = () => {
    navigate("/cart");
  };

  // Modal show and hide handlers
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to validate login credentials
  const validateAdminLogin = (inputUsername, inputPassword) => {
    if (adminData && inputUsername === adminData.username && inputPassword === adminData.password) {
      return true;
    }
    return false;
  };

  const handleLoginSubmit = () => {
    // Validate the entered credentials
    const isValidLogin = validateAdminLogin(username, password);

    if (isValidLogin) {
      // If login is successful, navigate to the admin page
      handleCloseModal();
      navigate("/admin");
    } else {
      // Display an error message if login fails
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{ background: "linear-gradient(90deg, red, black)", position: "sticky", top: "0", zIndex: "2" }}
        className="shadow"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white fw-bold d-flex align-items-center">
            <img
              src="data:image/png;base64,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"
              alt="Prime Shoes Logo"
              className="me-2 rounded-circle"
            />
            Prime Shoes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link as={Link} to="/shop" className="nav-link-custom">Shop</Nav.Link>
              <Nav.Link as={Link} to="/menswear" className="nav-link-custom">Men's Collection</Nav.Link>
              <Nav.Link as={Link} to="/womenwear" className="nav-link-custom">Women's Collection</Nav.Link>
              <Nav.Link as={Link} to="/kids" className="nav-link-custom">Kids' Collection</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact Us</Nav.Link>
              <div className="d-flex align-items-center icons-container">
                <span id="carticon" className="text-white fw-bold me-2" style={{ backgroundColor: "red" }}>{cartLen}</span>
                <FaShoppingCart className="icon space" onClick={cartPage} title="Cart" />
                <GrUserAdmin className="icon space" onClick={handleShowModal} title="Admin" />
                <FaSearch className="icon space" title="Search" />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Admin Login Modal */}
      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bold', color: '#343a40' }}>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label htmlFor="admin-username" style={{ fontWeight: '500' }}>Username:</label>
            <input
              type="text"
              id="admin-username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={{ marginTop: '5px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="admin-password" style={{ fontWeight: '500' }}>Password:</label>
            <input
              type="password"
              id="admin-password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{ marginTop: '5px' }}
            />
          </div>
          {loginError && <p className="text-danger mt-2">{loginError}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} style={{ borderRadius: '5px' }}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleLoginSubmit}
            style={{
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              borderRadius: '5px',
              padding: '8px 15px',
              fontWeight: 'bold',
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Topmenu;
