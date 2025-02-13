import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Register({ onSwitchPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Lógica de registro (alterada depois com a validação no banco
    console.log("Registrando usuário:", email, password);
    onSwitchPage("login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <div className="p-4 bg-white rounded shadow-sm">
            <h2 className="mb-4">Registrar</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                />
              </Form.Group>

              <Button variant="primary" onClick={handleRegister} className="w-100 mb-3">
                Registrar
              </Button>
            </Form>
            <div className="text-center">
              <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => onSwitchPage("login")}>
                Já tem uma conta? Faça login.
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;