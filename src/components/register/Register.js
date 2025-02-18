import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function Register({ onSwitchPage, setUser, setError }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [inativo, setInativo] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://localhost:7068/Usuario", {
        nome,
        email,
        senha,
        inativo
      });

      if (response.status === 200) {
        onSwitchPage("login");
      } 
    } catch (error) {
      setError("Erro ao se registrar. Contate o suporte.");
      console.log("Erro ao registrar:", error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <div className="p-4 bg-white rounded shadow-sm">
            <h2 className="mb-4">Registrar</h2>
            <Form>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                />
              </Form.Group>

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
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
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