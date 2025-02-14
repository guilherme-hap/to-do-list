import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

const EditUser = ({ user, setUser, onSwitchPage }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [photoPreview, setPhotoPreview] = useState(user.photo || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));

    if (name === "photo" && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setUser(editedUser);
    onSwitchPage("todo");
  };

  return (
    <Container className="p-4 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4 text-center">Editar Usuário</h2>

        <Row className="mb-4">
          <Col className="text-center">
            {photoPreview ? (
              <Image src={photoPreview} alt="Foto do usuário" rounded fluid />
            ) : (
              <div className="border p-4">Sem foto</div>
            )}
          </Col>
        </Row>

        <Form>
          <Form.Group controlId="photo" className="mb-3">
            <Form.Label className="fw-bold">Foto</Form.Label>
            <Form.Control type="file" name="photo" onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="name" className="mb-3">
            <Form.Label className="fw-bold">Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="lastName" className="mb-3">
            <Form.Label className="fw-bold">Sobrenome</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label className="fw-bold">E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="address" className="mb-3">
            <Form.Label className="fw-bold">Endereço</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={editedUser.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="birthDate" className="mb-3">
            <Form.Label className="fw-bold">Data de Nascimento</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={editedUser.birthDate}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
            <Button variant="secondary" onClick={() => onSwitchPage("todo")}>
              Cancelar
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EditUser;