import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">🎬 Movie Zone</Link>

        <div className="navbar-links">
          <Link to="/movies" className="nav-link">Movies</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <button className="nav-button" onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
