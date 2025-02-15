import React, { useState } from "react";
import { Container, Row, Col, Nav, Form, Dropdown, DropdownButton, Button } from "react-bootstrap";
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
    category: "",
    list: "",
    priority: "",
    status: "",
    favorite: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [selectedList, setSelectedList] = useState("Semestre");
  const [lists, setLists] = useState(["Semestre", "Sprint", "Diversão"]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showResetButton, setShowResetButton] = useState(false);

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

  const addTask = (e) => {
    e.preventDefault();
    if (
      newTask.title.trim() &&
      newTask.description.trim() &&
      newTask.startTime.trim() &&
      newTask.endTime.trim() &&
      newTask.date.trim() &&
      newTask.category.trim() &&
      newTask.list.trim() &&
      newTask.priority.trim() &&
      newTask.status.trim()
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
        category: "",
        list: "",
        priority: "",
        status: "",
        favorite: false
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

  const toggleFavorite = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, favorite: !task.favorite } : task
    );
    setTasks(updatedTasks);
  };

  const addList = (newList) => {
    if (newList && !lists.includes(newList)) {
      setLists([...lists, newList]);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.list === selectedList &&
    (filterStatus ? task.status === filterStatus : true) &&
    (filterDate ? task.date === filterDate : true)
  );

  const resetFilters = () => {
    setFilterStatus("");
    setFilterDate("");
    setSelectedFilter("");
    setShowResetButton(false);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowResetButton(true);
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
              <ToDoList
                user={loggedInUser}
                newTask={newTask}
                setNewTask={setNewTask}
                isEditing={isEditing}
                addTask={addTask}
                addList={addList}
                lists={lists}
              />
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
                <Nav variant="tabs" activeKey={selectedList} onSelect={(selectedKey) => setSelectedList(selectedKey)}>
                  {lists.map((list, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={list}>{list}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <DropdownButton id="dropdown-filters" title="Filtros" className="mb-3 mt-3">
                  <Dropdown.Item onClick={() => handleFilterSelect("status")}>Filtrar por Status</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterSelect("date")}>Filtrar por Data de Vencimento</Dropdown.Item>
                </DropdownButton>
                {showResetButton && (
                  <Button variant="secondary" onClick={resetFilters} className="mb-3">
                    Remover Filtros
                  </Button>
                )}
                {selectedFilter === "status" && (
                  <Form.Group controlId="formFilterStatus" className="mb-3">
                    <Form.Label className="fw-bold">Filtrar por Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="Pendente">Pendente</option>
                      <option value="Em desenvolvimento">Em desenvolvimento</option>
                      <option value="Concluída">Concluída</option>
                    </Form.Control>
                  </Form.Group>
                )}
                {selectedFilter === "date" && (
                  <Form.Group controlId="formFilterDate" className="mb-3">
                    <Form.Label className="fw-bold">Filtrar por Data de Vencimento</Form.Label>
                    <Form.Control
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                    />
                  </Form.Group>
                )}
                <TaskList tasks={filteredTasks} editTask={editTask} deleteTask={deleteTask} toggleFavorite={toggleFavorite}/>
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