import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './LoginUser.css' // It's named LoginAdmin.css in your code, I'll keep that.

export default function LoginUser() {
  const [rationCard, setRationCard] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/user-login", {
        rationCard,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/user-dashboard");
      } else {
        alert("Invalid ration card number or password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Citizen Login</h2>
        <p className="login-subtitle">Access your ration distribution portal</p>
        <form onSubmit={handleLogin} className="login-form">
          <input
            placeholder="Ration Card Number"
            value={rationCard}
            onChange={(e) => setRationCard(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}