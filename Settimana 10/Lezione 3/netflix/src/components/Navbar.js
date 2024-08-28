import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/logo.png';
import avatar from '../assets/Fox.png';
import './Navbar.css';

function CustomNavbar() {
  const [searchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  // Imposta un placeholder fisso per tutte le pagine
  const placeholder = "Cerca Serie TV...";

  return (
    <Navbar bg="#212121" expand="lg" style={{ marginLeft: '10px' }}>
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          width="125"
          height="60"
          className="d-inline-block align-top"
          alt="Brand Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="text-white nav-link-home">Home</Nav.Link>
          {/* Modifica il link TV Shows per puntare alla home page */}
          <Nav.Link as={Link} to="/" className="text-white">TV Shows</Nav.Link>
          <Nav.Link as={Link} to="/movies" className="text-white">Movies</Nav.Link>
          <Nav.Link as={Link} to="/recentlyadded" className="text-white">Recently Added</Nav.Link>
          <Nav.Link as={Link} to="/mylist" className="text-white">My List</Nav.Link>
        </Nav>
        <Form className="search-form ms-auto d-flex align-items-center">
          <FormControl
            type="text"
            placeholder={placeholder}  // Placeholder fisso
            className={`search-bar ${searchVisible ? 'visible' : ''}`}
          />
          <button
            type="button"
            onClick={() => setSearchVisible(!searchVisible)}
            className="search-button"
          >
            <i className="bi bi-search"></i>
          </button>
          <Link to="/account" className="avatar-link ms-2">
            <img
              src={avatar}
              alt="Avatar"
              className="avatar-image"
            />
          </Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
