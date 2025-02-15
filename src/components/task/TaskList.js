import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";

const TaskList = ({ tasks, editTask, deleteTask }) => {
  return (
    <Accordion className="mt-4">
      {tasks.map((task, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header as={Card.Header} style={{ cursor: "pointer" }}>
            {task.title}
          </Accordion.Header>
          <Accordion.Collapse eventKey={index.toString()} transition="true">
            <Card.Body className="p-3">
              <Card.Text>
                <strong>Descrição:</strong> {task.description}
              </Card.Text>
              <Card.Text>
                <strong>Data:</strong> {task.date}
              </Card.Text>
              <Card.Text>
                <strong>Hora de Início:</strong> {task.startTime}
              </Card.Text>
              <Card.Text>
                <strong>Hora do Fim:</strong> {task.endTime}
              </Card.Text>
              <Card.Text>
                <strong>Categoria:</strong> {task.category}
              </Card.Text>
              <Card.Text>
                <strong>Lista:</strong> {task.list}
              </Card.Text>
              <Card.Text>
                <strong>Prioridade:</strong> {task.priority}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {task.status}
              </Card.Text>
              <Button variant="warning" onClick={() => editTask(index)} className="me-2">
                Editar
              </Button>
              <Button variant="danger" onClick={() => deleteTask(index)}>
                Deletar
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default TaskList;