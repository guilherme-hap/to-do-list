import React from "react";
import { Container, Form, Button } from "react-bootstrap";

function ToDoList({
  user,
  newTask,
  setNewTask,
  isEditing,
  addTask,
}) {
  return (
    <Container className="p-4">
      <header className="mb-4">
        <h1>To-Do List</h1>
        <p>Bem-vindo, {user.name}!</p>
      </header>
      <Form onSubmit={addTask}>
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
        <Button variant="primary" type="submit" className="mb-3">
          {isEditing ? "Atualizar Tarefa" : "Adicionar Tarefa"}
        </Button>
      </Form>
    </Container>
  );
}

export default ToDoList;