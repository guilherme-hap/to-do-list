import React, { useEffect } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import "./TaskList.css";

const TaskList = ({ tasks, editTask, deleteTask, toggleFavorite, fetchTasks }) => {

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Accordion className="mt-4">
      {tasks.map((task) => (
        <Accordion.Item eventKey={task.id.toString()} key={task.id}>
          <Accordion.Header as={Card.Header} style={{ cursor: "pointer" }}>
            {task.titulo}
            {task.favorite && <span className="favorite"> ★</span>}
          </Accordion.Header>
          <Accordion.Collapse eventKey={task.id.toString()} transition="true">
            <Card.Body className="p-3">
              <Card.Text>
                <strong>Descrição:</strong> {task.descricao}
              </Card.Text>
              <Card.Text>
                <strong>Data:</strong> {task.dataLimite}
              </Card.Text>
              <Card.Text>
                <strong>Categoria:</strong> {task.categoriaId}
              </Card.Text>
              <Card.Text>
                <strong>Lista:</strong> {task.listaId}
              </Card.Text>
              <Card.Text>
                <strong>Prioridade:</strong> {task.prioridade}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {task.status}
              </Card.Text>
              <Button variant="warning" onClick={() => editTask(task.id)} className="me-2">
                Editar
              </Button>
              <Button variant="danger" onClick={() => deleteTask(task.id)} className="me-2">
                Deletar
              </Button>
              <Button variant="info" onClick={() => toggleFavorite(task.id)}>
                {task.favorite ? "Desfavoritar" : "Favoritar"}
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default TaskList;