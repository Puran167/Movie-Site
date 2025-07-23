import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showForm, setShowForm] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 500); 
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", "admin");

      alert("Login successful");
      navigate("/movies");
    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop className="login-bg-video">
        <source src="/videos/movie 3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-overlay"></div>

      {showForm && (
        <div className="login-box fade-in-smooth">
          <h2>🎟️ Welcome to <span className="brand">MovieZone</span></h2>
          <p className="subtitle">Login to book your tickets</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
