import React from "react";
import { ListGroup, Card, Button } from "react-bootstrap";

const TaskList = ({ tasks, editTask, deleteTask }) => {
  return (
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
  );
};

export default TaskList;