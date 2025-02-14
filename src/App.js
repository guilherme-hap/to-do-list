import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ToDoList from "./components/todo/Todolist";
import EditUser from "./components/EditUser/EditUser";
import NavigationBar from "./components/navbar/Navbar";
import TaskList from "./components/task/TaskList";

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

  // const handleUserClick = () => {
  //   setCurrentPage("todo");
  // };

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
    <Container fluid className="d-flex flex-column min-vh-100">
      {loggedInUser.name ? (
        <Row>

          <NavigationBar
            onHomeClick={handleHomeClick}
            onLogout={handleLogout}
            onEditUser={handleEditUser}
          />

          {currentPage === "editUser" && (
            <EditUser
              user={loggedInUser}
              setUser={setLoggedInUser}
              onSwitchPage={setCurrentPage}
            />
          )}

          {currentPage === "todo" && (
            <Col md={6} className="p-3 mx-auto">
              <>
                <ToDoList
                  user={loggedInUser}
                  newTask={newTask}
                  setNewTask={setNewTask}
                  isEditing={isEditing}
                  addTask={addTask}
                />
              </>
            </Col>
          )}
    
          {currentPage === "todo" && (
            <Col md={6} className="d-flex justify-content-center align-items-start p-3">
              <div className="w-100">
                <iframe
                  title="spotify"
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
                <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
              </div>
            </Col>
          )}

        </Row>
      ) : (
        <Row className="flex-grow-1">
          <Col md={6} className="p-3 mx-auto">
            {currentPage === "login" && (
              <Login onSwitchPage={setCurrentPage} setUser={setLoggedInUser} />
            )}
            {currentPage === "register" && <Register onSwitchPage={setCurrentPage} />}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;