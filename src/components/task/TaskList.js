import React, { useEffect } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import "./TaskList.css";

const TaskList = ({ tasks, editTask, deleteTask, fetchTasks, getCategoryName, getListName, getPriorityText, formatDate, setIsEditing }) => {

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Accordion className="mt-4">
      {tasks.filter(task => !task.inativo).map((task) => (
        <Accordion.Item eventKey={task.id.toString()} key={task.id}>
          <Accordion.Header as={Card.Header} style={{ cursor: "pointer" }}>
            {task.titulo}
          </Accordion.Header>
          <Accordion.Collapse eventKey={task.id.toString()} transition="true">
            <Card.Body className="p-3">
              <Card.Text>
                <strong>Descrição:</strong> {task.descricao}
              </Card.Text>
              <Card.Text>
                <strong>Data:</strong> {formatDate(task.dataLimite)}
              </Card.Text>
              <Card.Text>
                <strong>Categoria:</strong> {getCategoryName(task.categoriaId)}
              </Card.Text>
              <Card.Text>
                <strong>Lista:</strong> {getListName(task.listaId)}
              </Card.Text>
              <Card.Text>
                <strong>Prioridade:</strong> {getPriorityText(task.prioridade)}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {task.status}
              </Card.Text>
              <Button variant="warning" onClick={() => { editTask(task); setIsEditing(true); console.log(task) }} className="me-2">
                Editar
              </Button>
              <Button variant="danger" onClick={() => deleteTask(task)} className="me-2">
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