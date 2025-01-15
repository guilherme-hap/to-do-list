import React from "react";


function Register({ onSwitchPage }) {
  return (
    <div className="register-container">
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <span onClick={() => onSwitchPage("login")}>Login</span>
      </p>
    </div>
  );
}

export default Register;
