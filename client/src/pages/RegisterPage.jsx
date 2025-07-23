import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showForm, setShowForm] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 500); 
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop className="login-bg-video">
        <source src="/videos/movie 6.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-overlay"></div>

      {showForm && (
        <div className="login-box fade-in-smooth">
          <h2>🎟️ Join <span className="brand">MovieZone</span></h2>
          <p className="subtitle">Create your account to start booking</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
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
            <button type="submit">Sign Up</button>
          </form>

          <p className="signup-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
