import React, { useState } from "react";
import { Container, Form, Button, ListGroup, Card } from "react-bootstrap";

function ToDoList({ user }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (
      newTask.title.trim() &&
      newTask.description.trim() &&
      newTask.startTime.trim() &&
      newTask.endTime.trim() &&
      newTask.date.trim()
    ) {
      if (isEditing) {
        const updatedTasks = [...tasks];
        updatedTasks[currentTaskIndex] = newTask;
        setTasks(updatedTasks);
        setIsEditing(false);
      } else {
        setTasks([...tasks, newTask]);
      }
      setNewTask({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
      });
    }
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

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
      <ListGroup className="mt-4">
        {tasks.map((task, index) => (
          <ListGroup.Item key={index} className="mb-2">
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>
                  <strong>Data:</strong> {task.date}
                </Card.Text>
                <Card.Text>
                  <strong>Hora de Início:</strong> {task.startTime}
                </Card.Text>
                <Card.Text>
                  <strong>Hora do Fim:</strong> {task.endTime}
                </Card.Text>
                <Button variant="warning" onClick={() => editTask(index)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => deleteTask(index)}>
                  Deletar
                </Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default ToDoList;