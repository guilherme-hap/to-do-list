import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import api from "../api/api";
import AddItemModal from "../modal/AddItemModal";

function ToDoList({
  user,
  newTask,
  setNewTask,
  isEditing,
  addTask,
  lists,
  setLists,
  categories,
  setCategories,
  setSelectedList,
  fetchTasks
}) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    await fetchCategories();
    await fetchLists();
  };

  const addInitialCategory = async () => {
    try {
      const response = await api.post("/Categoria", { nome: "Geral", descricao: "Geral", inativo: false });
      if (response.data) {
        console.log("Categoria inicial adicionada com sucesso.");
        await fetchCategories();
      } else {
        setErrorMessage("Erro ao adicionar categoria inicial. Tente novamente.");
      }
    } catch (error) {
      setErrorMessage("Erro ao adicionar categoria inicial. Tente novamente.");
      console.log("Erro ao adicionar categoria inicial:", error.message);
    }
  };

  const addInitialList = async () => {
    try {
      const response = await api.post("/Lista", { nome: "Minha lista", descricao: "Minha lista", inativo: false });
      if (response.data) {
        console.log("Lista inicial adicionada com sucesso.");
        await fetchLists();
      } else {
        setErrorMessage("Erro ao adicionar lista inicial. Tente novamente.");
      }
    } catch (error) {
      setErrorMessage("Erro ao adicionar lista inicial. Tente novamente.");
      console.log("Erro ao adicionar lista inicial:", error.message);
    }
  };

  const fetchLists = async () => {
    try {
      const listsResponse = await api.get("/Lista");
      const activeLists = listsResponse.data.filter(list => !list.inativo);
      console.log("Passou por fetchLists");
      console.log(activeLists);
      setLists(activeLists);
      if (activeLists.length === 0) {
        await addInitialList();
      } else {
        setNewTask(prevTask => ({
          ...prevTask,
          listaId: activeLists[0].id
        }));
        setSelectedList(activeLists[0].id);
      }
    } catch (error) {
      console.error("Erro ao carregar listas:", error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesResponse = await api.get("/Categoria");
      const activeCategories = categoriesResponse.data.filter(category => !category.inativo);
      console.log("Passou por fetchCategories");
      console.log(activeCategories)
      setCategories(activeCategories);
      if (activeCategories.length === 0) {
        await addInitialCategory();
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error.message);
    }
  };

  const handleAddCategory = async (newCategory) => {
    if (newCategory && !categories.some(category => category.nome === newCategory)) {
      try {
        const response = await api.post("/Categoria", { nome: newCategory, descricao: "", inativo: false });
  
        const newCat = response.data;
          
        // Atualiza categorias imediatamente
        setCategories(prevCategories => [...prevCategories, newCat]);
  
        // Define a nova categoria como selecionada
        setNewTask(prevTask => ({
          ...prevTask,
          categoriaId: newCat.id
        }));

        await fetchCategories();
      } catch (error) {
        setErrorMessage("Erro ao adicionar categoria. Tente novamente.");
        console.error("Erro ao adicionar categoria:", error.message);
      }
    }
  };
  
  const handleAddList = async (newList) => {
    if (newList && !lists.some(list => list.nome === newList)) {
      try {
        const response = await api.post("/Lista", { nome: newList, descricao: "", inativo: false });
  
        const newLst = response.data;
          
        // Atualiza listas imediatamente
        setLists(prevLists => [...prevLists, newLst]);
  
        // Define a nova lista como selecionada
        setNewTask(prevTask => ({
          ...prevTask,
          listaId: newLst.id
        }));

        console.log(newLst.id);
        setSelectedList(newLst.id);

        await fetchLists();
      } catch (error) {
        setErrorMessage("Erro ao adicionar lista. Tente novamente.");
        console.error("Erro ao adicionar lista:", error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newTask.titulo.trim() ||
      !newTask.descricao.trim() ||
      !newTask.dataLimite.trim() ||
      !newTask.prioridade.trim() ||
      !newTask.status.trim()
    ) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
    setErrorMessage("");

    const taskData = {
      titulo: newTask.titulo,
      descricao: newTask.descricao,
      prioridade: newTask.prioridade,
      status: newTask.status,
      dataLimite: newTask.dataLimite,
      listaId: newTask.listaId,
      categoriaId: newTask.categoriaId,
      inativo: false
    };

    try {
      console.log(taskData);
      const response = await api.post("/Tarefa", taskData);
      addTask(response.data);
      setNewTask({
        titulo: "",
        descricao: "",
        dataLimite: "",
        listaId: "",
        categoriaId: "",
        prioridade: "",
        status: "",
        inativo: false
      });
      await fetchTasks();
    } catch (error) {
      setErrorMessage("Erro ao adicionar tarefa. Tente novamente.");
      console.log("Erro ao adicionar tarefa:", error.message);
    }
  };

  return (
    <Container className="p-4">
      <header className="mb-4">
        <h1>To-Do List</h1>
        <p>Bem-vindo, {user.name}!</p>
      </header>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTaskTitle" className="mb-3">
          <Form.Label className="fw-bold">Título da Tarefa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título da Tarefa"
            value={newTask.titulo}
            onChange={(e) => setNewTask({ ...newTask, titulo: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTaskDescription" className="mb-3">
          <Form.Label className="fw-bold">Descrição da Tarefa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Descrição da Tarefa"
            value={newTask.descricao}
            onChange={(e) => setNewTask({ ...newTask, descricao: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTaskDate" className="mb-3">
          <Form.Label className="fw-bold">Data</Form.Label>
          <Form.Control
            type="date"
            value={newTask.dataLimite}
            onChange={(e) => setNewTask({ ...newTask, dataLimite: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTaskCategory" className="mb-3">
          <Form.Label className="fw-bold">Categoria</Form.Label>
          <Form.Control
            as="select"
            value={newTask.categoriaId}
            onChange={(e) => setNewTask({ ...newTask, categoriaId: e.target.value })}
          >
            <option value="">Selecione uma categoria</option>
            {Array.isArray(categories) && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </Form.Control>
          <Button variant="link" onClick={() => setShowCategoryModal(true)}>
            Adicionar Nova Categoria
          </Button>
        </Form.Group>
        <Form.Group controlId="formTaskList" className="mb-3">
          <Form.Label className="fw-bold">Lista</Form.Label>
          <Form.Control
            as="select"
            value={newTask.listaId}
            onChange={(e) => setNewTask({ ...newTask, listaId: e.target.value })}
          >
            <option value="">Selecione uma lista</option>
            {lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.nome}
              </option>
            ))}
          </Form.Control>
          <Button variant="link" onClick={() => setShowListModal(true)}>
            Adicionar Nova Lista
          </Button>
        </Form.Group>
        <Form.Group controlId="formTaskPriority" className="mb-3">
          <Form.Label className="fw-bold">Prioridade</Form.Label>
          <Form.Control
            as="select"
            value={newTask.prioridade}
            onChange={(e) => setNewTask({ ...newTask, prioridade: e.target.value })}
          >
            <option value="">Selecione uma prioridade</option>
            <option value="0">Baixa</option>
            <option value="1">Média</option>
            <option value="2">Alta</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formTaskStatus" className="mb-3">
          <Form.Label className="fw-bold">Status</Form.Label>
          <Form.Control
            as="select"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="">Selecione um status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em desenvolvimento">Em desenvolvimento</option>
            <option value="Concluída">Concluída</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          {isEditing ? "Atualizar Tarefa" : "Adicionar Tarefa"}
        </Button>
      </Form>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <AddItemModal
        show={showCategoryModal}
        handleClose={() => setShowCategoryModal(false)}
        handleAdd={handleAddCategory}
        itemType="Categoria"
      />
      <AddItemModal
        show={showListModal}
        handleClose={() => setShowListModal(false)}
        handleAdd={handleAddList}
        itemType="Lista"
      />
    </Container>
  );
}

export default ToDoList;