import React, { useState } from "react";
import "./components/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ToDoList from "./components/Todolist";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <div className="app">
      {currentPage === "login" && <Login onSwitchPage={setCurrentPage} />}
      {currentPage === "register" && <Register onSwitchPage={setCurrentPage} />}
      {currentPage === "todo" && <ToDoList onSwitchPage={setCurrentPage} />}
    </div>
  );
}

export default App;
