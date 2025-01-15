import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [loggedInUser, setLoggedInUser] = useState({ name: "", email: "" });

  return (
    <div className="app">
      {loggedInUser.name && (
        <aside className="sidebar">
          <h2>Usuário</h2>
          <p><strong>Nome:</strong> {loggedInUser.name}</p>
          <p><strong>Email:</strong> {loggedInUser.email}</p>
          <br></br>
          <button onClick={() => { setLoggedInUser({ name: "", email: "" }); setCurrentPage("login"); }}>Logout</button>
        </aside>
      )}
      <div className="main-content">
        {currentPage === "login" && <Login onSwitchPage={setCurrentPage} setUser={setLoggedInUser} />}
        {currentPage === "register" && <Register onSwitchPage={setCurrentPage} />}
        {currentPage === "todo" && <ToDoList />}
      </div>
      {currentPage === "todo" && (
        <aside className="spotify-iframe">
          <iframe
            style={{ borderRadius: "12px", width: "100%", height: "500px" }}
            src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </aside>
      )}
    </div>
  );
}

function Login({ onSwitchPage, setUser }) {
  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: "User123", email: "user123@example.com" });
    onSwitchPage("todo");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <span onClick={() => onSwitchPage("register")}>Register</span>
      </p>
    </div>
  );
}

function Register({ onSwitchPage }) {
  const handleRegister = (e) => {
    e.preventDefault();
    onSwitchPage("login");
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <span onClick={() => onSwitchPage("login")}>Login</span>
      </p>
    </div>
  );
}

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", date: "", startTime: "", endTime: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim() && newTask.description.trim() && newTask.startTime.trim() && newTask.endTime.trim() && newTask.date.trim()) {
      if (isEditing) {
        const updatedTasks = [...tasks];
        updatedTasks[currentTaskIndex] = newTask;
        setTasks(updatedTasks);
        setIsEditing(false);
      } else {
        setTasks([...tasks, newTask]);
      }
      setNewTask({ title: "", description: "", date: "", startTime: "", endTime: "" });
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
      </header>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Título da Tarefa"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição da Tarefa"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <input
          type="time"
          placeholder="Hora de Início"
          value={newTask.startTime}
          onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
        />
        <input
          type="time"
          placeholder="Hora do Fim"
          value={newTask.endTime}
          onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
        />
        <button type="submit">{isEditing ? "Atualizar Tarefa" : "Adicionar Tarefa"}</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Data:</strong> {task.date}</p>
            <p><strong>Hora de Início:</strong> {task.startTime}</p>
            <p><strong>Hora do Fim:</strong> {task.endTime}</p>
            <button onClick={() => editTask(index)}>Editar</button>
            <button onClick={() => deleteTask(index)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
