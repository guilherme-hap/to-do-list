import React, { useState } from "react";

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
    <div className="todo-container">
      <header>
        <h1>To-Do List</h1>
        <p>Bem-vindo, {user.name}!</p> 
      </header>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Título da Tarefa"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descrição da Tarefa"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) =>
            setNewTask({ ...newTask, date: e.target.value })
          }
        />
        <input
          type="time"
          placeholder="Hora de Início"
          value={newTask.startTime}
          onChange={(e) =>
            setNewTask({ ...newTask, startTime: e.target.value })
          }
        />
        <input
          type="time"
          placeholder="Hora do Fim"
          value={newTask.endTime}
          onChange={(e) =>
            setNewTask({ ...newTask, endTime: e.target.value })
          }
        />
        <button type="submit">
          {isEditing ? "Atualizar Tarefa" : "Adicionar Tarefa"}
        </button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Data:</strong> {task.date}
            </p>
            <p>
              <strong>Hora de Início:</strong> {task.startTime}
            </p>
            <p>
              <strong>Hora do Fim:</strong> {task.endTime}
            </p>
            <button onClick={() => editTask(index)}>Editar</button>
            <button onClick={() => deleteTask(index)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
