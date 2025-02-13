import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ToDoList from "./components/todo/Todolist";
import EditUser from "./components/EditUser/EditUser";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [loggedInUser, setLoggedInUser] = useState({
    name: "",
    email: "",
    photo: "",
    lastName: "",
    address: "",
    birthDate: "",
  });

  const handleLogout = () => {
    setLoggedInUser({ name: "", email: "" });
    setCurrentPage("login");
  };

  const handleEditUser = () => {
    setCurrentPage("editUser");
  };

  const handleHomeClick = () => {
    setCurrentPage("todo");
  };

  const handleUserClick = () => {
    setCurrentPage("todo");
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      {loggedInUser.name ? (
        <Row className="flex-grow-1">
          <Col md={3} className="bg-light p-3 d-flex flex-column" style={{ height: "100vh" }}>
            <Card className="flex-grow-1 d-flex flex-column">
              <Card.Header onClick={handleUserClick} style={{ cursor: "pointer" }}>
                Usuário
              </Card.Header>
              <Card.Body className="flex-grow-1">
                <Card.Text>
                  <strong>Nome:</strong> {loggedInUser.name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {loggedInUser.email}
                </Card.Text>
                <Button variant="primary" onClick={handleEditUser} className="mb-2 w-100">
                  Editar Usuário
                </Button>
              </Card.Body>
              <Card.Footer>
                <Button variant="danger" onClick={handleLogout} className="w-100">
                  Logout
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={6} className="p-3">
            {currentPage === "todo" && <ToDoList user={loggedInUser} />}
            {currentPage === "editUser" && (
              <EditUser
                user={loggedInUser}
                setUser={setLoggedInUser}
                onSwitchPage={setCurrentPage}
              />
            )}
          </Col>
          <Col md={3} className="d-flex justify-content-center align-items-start p-3">
            {currentPage === "todo" && (
              <div className="w-100">
                <iframe
                  title="spotify"
                  className="w-100"
                  style={{ borderRadius: "12px", height: "500px" }}
                  src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </Col>
        </Row>
      ) : (
        <Row className="flex-grow-1">
          <Col md={6} className="p-3 mx-auto">
            {currentPage === "login" && (
              <Login onSwitchPage={setCurrentPage} setUser={setLoggedInUser} />
            )}
            {currentPage === "register" && <Register onSwitchPage={setCurrentPage} />}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;