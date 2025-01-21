import React, { useState } from "react";
import "./EditUser.css";  

const EditUser = ({ user, setUser, onSwitchPage }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [photoPreview, setPhotoPreview] = useState(user.photo || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));


    if (name === "photo" && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhotoPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSave = () => {
    setUser(editedUser);  
    onSwitchPage("todo"); 
  };

  return (
    <div className="edit-user-container">
      <h2>Editar Usuário</h2>

      <div className="photo-preview">
        {photoPreview ? (
          <img src={photoPreview} alt="Foto do usuário" className="photo-image" />
        ) : (
          <div className="photo-placeholder">Sem foto</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="photo">Foto</label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedUser.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Sobrenome</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={editedUser.lastName}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Endereço</label>
        <input
          type="text"
          id="address"
          name="address"
          value={editedUser.address}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthDate">Data de Nascimento</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={editedUser.birthDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="btn-save">Salvar</button>
        <button onClick={() => onSwitchPage("todo")} className="btn-cancel">Cancelar</button>
      </div>
    </div>
  );
};

export default EditUser;
