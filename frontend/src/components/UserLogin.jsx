import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserLogin.css"; // Assuming you have a separate CSS for user login

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      if (response.data.token) {
        // Save the token to localStorage for user login
        localStorage.setItem("token", response.data.token);
        // Redirect to User Dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-form">
      <h2>Login as User</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login as User</button>
      </form>
    </div>
  );
};

export default UserLogin;
