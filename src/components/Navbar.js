import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = ({ userRole }) => {
  const navigate = useNavigate();

  const handleDashboardNavigation = () => {
    if (userRole === 'Citizen') {
      navigate('/user-dashboard');
    } else if (userRole === 'City Official') {
      navigate('/authority-dashboard');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/home')}>
        Urban Improvement Hub
      </div>
      <div className="navbar-links">
        <Link to="/issues" className="nav-link">View Issues</Link>
        <span className="nav-link" onClick={handleDashboardNavigation}>
          Dashboard
        </span>
        <Link to="/" className="nav-link">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
