import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        Urban Improvement Hub
      </div>
      <div className="navbar-links">
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/issues" className="nav-link">View Issues</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
