import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddItemModal = ({ show, handleClose, handleAdd, itemType }) => {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = () => {
    handleAdd(newItem);
    setNewItem("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Nova {itemType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewItem">
            <Form.Label>Nome da {itemType}</Form.Label>
            <Form.Control
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={`Digite a nova ${itemType.toLowerCase()}`}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;