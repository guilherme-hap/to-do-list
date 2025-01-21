import React, { useState } from "react";
import "./Login.css";

function Login({ onSwitchPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "a@a.com" && password === "123") {
      setUser({ name: "Usuário Exemplo", email });
      onSwitchPage("todo");
    } else {
      setError("Credenciais incorretas.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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
        {error && <p className="error-message">{error}</p>}
        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>
        <div className="link" onClick={() => onSwitchPage("register")}>
          Registrar-se
        </div>
      </div>
    </div>
  );
}

export default Login;
