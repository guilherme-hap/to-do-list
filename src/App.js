import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Form, Dropdown, DropdownButton, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ToDoList from "./components/todo/Todolist";
import EditUser from "./components/EditUser/EditUser";
import NavigationBar from "./components/navbar/Navbar";
import TaskList from "./components/task/TaskList";
import api from "./components/api/api";

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
    id: "",
    inativo: false,
    dataCriacao: "",
    titulo: "",
    descricao: "",
    prioridade: "",
    status: "",
    dataLimite: "",
    listaId: "",
    categoriaId: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [selectedList, setSelectedList] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showResetButton, setShowResetButton] = useState(false);
  const [lists, setLists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [playlistUrl, setPlaylistUrl] = useState("");

  useEffect(() => {
    if (selectedList) {
      fetchTasks();
    }
  }, [selectedList]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setPlaylistUrl("https://open.spotify.com/playlist/5sXoVwAIZMZ2nCuQRND4Gf?si=zoPtGj9RRcS3wcABtnkUZA");
    } else if (currentHour >= 12 && currentHour < 18) {
      setPlaylistUrl("https://open.spotify.com/playlist/5gbPJoh5uzDoLoatPmULrR?si=PoA_gXR2RzqXW25pp4tKnQ");
    } else {
      setPlaylistUrl("https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM?si=PIipHH4QSASiW_L-9UVloQ");
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`https://localhost:7068/Tarefa`);
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.log("Erro ao buscar tarefas:", error.message);
    }
  };

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

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.nome : "Categoria não encontrada";
  };

  const getListName = (listId) => {
    const list = lists.find(lst => lst.id === listId);
    return list ? list.nome : "Lista não encontrada";
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 0:
        return "Baixa";
      case 1:
        return "Média";
      case 2:
        return "Alta";
      default:
        return "Desconhecida";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const addTask = () => {
    if (
      newTask.titulo.trim() &&
      newTask.descricao.trim() &&
      newTask.dataLimite.trim() &&
      newTask.categoriaId.trim() &&
      newTask.prioridade.trim() &&
      newTask.status.trim()
    ) {
      setNewTask({
        id: "",
        inativo: false,
        dataCriacao: "",
        titulo: "",
        descricao: "",
        prioridade: "",
        status: "",
        dataLimite: "",
        listaId: selectedList || "",
        categoriaId: ""
      });
    }
  };

  const editTask = async (task) => {
    setNewTask({
      ...task,
      dataLimite: task.dataLimite.split('T')[0] // Ajuste o formato da data
    });
    setIsEditing(true);
    setCurrentPage("todo");
  };

  const deleteTask = async (task) => {
    const updatedTasks = task.inativo ? tasks.filter((t) => t.id !== task.id) : tasks.map((t) => t.id === task.id ? { ...t, inativo: true } : t);
    try {
      const dataAtual = new Date();
      const dataFormatada = new Date(dataAtual.getTime() - dataAtual.getTimezoneOffset() * 60000).toISOString(); 
      const response = await api.put(`https://localhost:7068/Tarefa/${task.id}`, 
      { titulo: task.titulo, 
        dataLimite: dataFormatada, 
        descricao: task.descricao, 
        status: task.status, 
        inativo: true, 
        prioridade: task.prioridade, 
        listaId: task.listaId, 
        categoriaId: task.categoriaId 
      });
      if (response.status === 200) {
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.log("Erro ao atualizar tarefa:", error.message);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.listaId === selectedList &&
    (filterStatus ? task.status === filterStatus : true) &&
    (filterDate ? task.dataLimite === filterDate : true)
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
                setIsEditing={setIsEditing}
                addTask={addTask}
                lists={lists}
                setLists={setLists}
                categories={categories}
                setCategories={setCategories}
                setTasks={setTasks}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                fetchTasks={fetchTasks}
              />
            </Col>
          )}
          {currentPage === "todo" && (
            <Col md={6} className="d-flex justify-content-center align-items-start p-3">
              <div className="w-100">
                {playlistUrl && (<iframe
                  title="spotify"
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/playlist/${playlistUrl.split('/').pop()}?si=PIipHH4QSASiW_L-9UVloQ`}
                  width="100%"
                  height="152"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>)}
                <Nav variant="tabs" activeKey={selectedList} onSelect={(selectedKey) => setSelectedList(selectedKey)}>
                  {lists.map((list) => (
                    <Nav.Item key={list.id} onClick={() => setSelectedList(list.id)}>
                      <Nav.Link eventKey={list.id}>{list.nome}</Nav.Link>
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
                <TaskList 
                  tasks={filteredTasks}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  fetchTasks={fetchTasks}
                  lists={lists}
                  categories={categories}
                  getCategoryName={getCategoryName}
                  getListName={getListName}
                  getPriorityText={getPriorityText}
                  formatDate={formatDate}
                  setIsEditing={setIsEditing}
                />
              </div>
            </Col>
          )}
        </Row>
      ) : (
        <Row className="flex-grow-1" style={{ overflow: "hidden", height: "100vh" }}>
          <Col md={6} className="p-3 mx-auto">
            {currentPage === "login" && (
              <Login onSwitchPage={setCurrentPage} setUser={setLoggedInUser} sty/>
            )}
            {currentPage === "register" && <Register onSwitchPage={setCurrentPage} />}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;