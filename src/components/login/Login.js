import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { setAccessToken } from "../api/api";
import "./Login.css";

function Login({ onSwitchPage, setUser }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://localhost:7068/Login", {
        email,
        senha,
      });

      if (response.status === 200) {
        setUser({ name: response.data.nomeUsuario, email });
        setAccessToken(response.data.token);
        onSwitchPage("todo");
      } else {
        setError("Credenciais incorretas.");
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente mais tarde.");
      console.log("Erro ao fazer login:", error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <div className="p-4 bg-white rounded shadow-sm">
            <h2 className="mb-4">Login</h2>
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
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Senha"
                />
              </Form.Group>

              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

              <Button variant="primary" onClick={handleLogin} className="w-100 mb-3">
                Entrar
              </Button>
            </Form>
            <div className="text-center">
              <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => onSwitchPage("register")}>
                Registrar-se
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;