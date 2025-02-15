import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import AddItemModal from "../modal/AddItemModal";

function ToDoList({
  user,
  newTask,
  setNewTask,
  isEditing,
  addTask,
  addList,
  lists,
}) {
  const [categories, setCategories] = useState(["Trabalho", "Escola", "Lazer"]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddCategory = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleAddList = (newList) => {
    addList(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newTask.title.trim() ||
      !newTask.description.trim() ||
      !newTask.date.trim() ||
      !newTask.startTime.trim() ||
      !newTask.endTime.trim() ||
      !newTask.category.trim() ||
      !newTask.list.trim() ||
      !newTask.priority.trim() ||
      !newTask.status.trim()
    ) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
    setErrorMessage("");
    addTask(e);
  };

  return (
    <Container className="p-4">
      <header className="mb-4">
        <h1>To-Do List</h1>
        <p>Bem-vindo, {user.name}!</p>
      </header>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTaskTitle" className="mb-3">
          <Form.Label className="fw-bold">Título da Tarefa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título da Tarefa"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTaskDescription" className="mb-3">
          <Form.Label className="fw-bold">Descrição da Tarefa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Descrição da Tarefa"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTaskDate" className="mb-3">
          <Form.Label className="fw-bold">Data</Form.Label>
          <Form.Control
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTaskStartTime" className="mb-3">
          <Form.Label className="fw-bold">Hora de Início</Form.Label>
          <Form.Control
            type="time"
            value={newTask.startTime}
            onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTaskEndTime" className="mb-3">
          <Form.Label className="fw-bold">Hora do Fim</Form.Label>
          <Form.Control
            type="time"
            value={newTask.endTime}
            onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTaskCategory" className="mb-3">
          <Form.Label className="fw-bold">Categoria</Form.Label>
          <Form.Control
            as="select"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
          <Button variant="link" onClick={() => setShowCategoryModal(true)}>
            Adicionar Nova Categoria
          </Button>
        </Form.Group>
        <Form.Group controlId="formTaskList" className="mb-3">
          <Form.Label className="fw-bold">Lista</Form.Label>
          <Form.Control
            as="select"
            value={newTask.list}
            onChange={(e) => setNewTask({ ...newTask, list: e.target.value })}
          >
            <option value="">Selecione uma lista</option>
            {lists.map((list, index) => (
              <option key={index} value={list}>
                {list}
              </option>
            ))}
          </Form.Control>
          <Button variant="link" onClick={() => setShowListModal(true)}>
            Adicionar Nova Lista
          </Button>
        </Form.Group>
        <Form.Group controlId="formTaskPriority" className="mb-3">
          <Form.Label className="fw-bold">Prioridade</Form.Label>
          <Form.Control
            as="select"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="">Selecione uma prioridade</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formTaskStatus" className="mb-3">
          <Form.Label className="fw-bold">Status</Form.Label>
          <Form.Control
            as="select"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="">Selecione um status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em desenvolvimento">Em desenvolvimento</option>
            <option value="Concluída">Concluída</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          {isEditing ? "Atualizar Tarefa" : "Adicionar Tarefa"}
        </Button>
      </Form>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <AddItemModal
        show={showCategoryModal}
        handleClose={() => setShowCategoryModal(false)}
        handleAdd={handleAddCategory}
        itemType="Categoria"
      />
      <AddItemModal
        show={showListModal}
        handleClose={() => setShowListModal(false)}
        handleAdd={handleAddList}
        itemType="Lista"
      />
    </Container>
  );
}

export default ToDoList;