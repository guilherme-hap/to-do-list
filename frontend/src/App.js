import React, { useState } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ToDoList from "./components/todo/Todolist";
import EditUser from "./components/EditUser/EditUser";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [loggedInUser, setLoggedInUser] = useState({
    name: "",
    email: "",
    photo: "",
    lastName: "",
    address: "",
    birthDate: "",
  });

  const handleLogout = () => {
    setLoggedInUser({ name: "", email: "" });
    setCurrentPage("login");
  };

  const handleEditUser = () => {
    setCurrentPage("editUser");
  };

  const handleHomeClick = () => {
    setCurrentPage("todo");
  };

  const handleUserClick = () => {
    setCurrentPage("todo"); 
  };

  return (
    <div className="app">
      {loggedInUser.name && (
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2 onClick={handleUserClick} style={{ cursor: "pointer" }}>
              Usuário
            </h2>
          </div>

          <p>
            <strong>Nome:</strong> {loggedInUser.name}
          </p>
          <p>
            <strong>Email:</strong> {loggedInUser.email}
          </p>
          <br />
          <button onClick={handleEditUser} className="btn-edit-user">
            Editar Usuário
          </button>
          <div className="logout-button-container">
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </aside>
      )}

      <div className="main-content">
        {currentPage === "login" && (
          <Login onSwitchPage={setCurrentPage} setUser={setLoggedInUser} />
        )}
        {currentPage === "register" && <Register onSwitchPage={setCurrentPage} />}
        {currentPage === "todo" && <ToDoList user={loggedInUser} />}
        {currentPage === "editUser" && (
          <EditUser
            user={loggedInUser}
            setUser={setLoggedInUser}
            onSwitchPage={setCurrentPage}
          />
        )}
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

export default App;
