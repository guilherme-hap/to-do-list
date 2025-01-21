import React, { useState } from "react";
import "./Register.css";

function Register({ onSwitchPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Lógica de registro (alterada depois com a validação no banco
    console.log("Registrando usuário:", email, password);
    onSwitchPage("login"); 
  };

  return (
    <div className="register-container">
      <h2>Registrar</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        className="input-field"
      />
      <button className="register-button" onClick={handleRegister}>
        Registrar
      </button>
      <div className="link" onClick={() => onSwitchPage("login")}>
        Já tem uma conta? Faça login.
      </div>
    </div>
  );
}

export default Register;
