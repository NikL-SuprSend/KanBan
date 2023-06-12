import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Error registering user: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      alert("Registered Successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleRegister}>
        <label htmlFor="username">Enter your email</label>
        <input
          type="email"
          name="username"
          id="username"
          className="input"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="username">Choose a password</label>
        <input
          type="password"
          name="password"
          className="input"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          // value={password}
        />

        <div className="button-container">
          <button type="submit" className="btn">
            Register
          </button>
          <button className="btn" onClick={() => navigate("/login")}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
