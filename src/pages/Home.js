import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Home.css';
import viewIcon from '../assets/icons/view-icon.png';
import dashboardIcon from '../assets/icons/dashboard-icon.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Empowering Citizens, Improving Cities</h1>
        <p>Join us in making our city a better place by reporting issues and staying informed.</p>
        <button className="cta-button" onClick={() => navigate('/report')}>Report an Issue</button>
      </div>

      <div className="quick-links">
        <div className="link-card" onClick={() => navigate('/issues')}>
          <img src={viewIcon} alt="View Issues" className="link-icon" />
          <h2>View Recent Issues</h2>
          <p>See what issues are being reported and track their resolution status.</p>
        </div>
        <div className="link-card" onClick={() => navigate('/dashboard')}>
          <img src={dashboardIcon} alt="Dashboard" className="link-icon" />
          <h2>City Officials Dashboard</h2>
          <p>Access real-time insights and manage reported issues efficiently.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
