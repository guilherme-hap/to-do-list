import React from "react";

function Login({ onSwitchPage }) {
    const handleLogin = (e) => {
      e.preventDefault();
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
          Don't have an account?{" "}
          <span onClick={() => onSwitchPage("register")}>Register</span>
        </p>
      </div>
    );
  }
  

export default Login;
