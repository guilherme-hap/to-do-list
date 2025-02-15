import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import "./Navbar.css";

const NavigationBar = ({ onHomeClick, onLogout, onEditUser }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-2">
      <Navbar.Brand onClick={onHomeClick} style={{ cursor: "pointer" }}>
        <Image
          src="/assets/images/logo.jpeg"
          alt="Logo"
          className="rounded-circle logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex justify-content-end" style={{ width: "100%" }}>
          <Nav.Link onClick={onEditUser}>Editar Usuário</Nav.Link>
          <Nav.Link onClick={onLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;