import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      console.log("Login successful:", data);
      localStorage.setItem('userId', data.userId);
      alert(data.message);
        navigate("/task");
     
    } else {
      console.log("Login failed:", data);
      alert(data.message);
    }
  };

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleLogin}>
        <label htmlFor="username">Provide your email</label>
        <input
          type="email"
          name="username"
          className="input"
          id="username"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          />
        <label htmlFor="username">Enter your password</label>
        <input
          type="password"
          className="input"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          // value={password}
        />
        <button  className="btn">
          Log In
        </button>
      </form>
    </div>
  );
};
export default Login;
