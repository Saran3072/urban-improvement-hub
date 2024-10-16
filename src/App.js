// import React, { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import ReportIssue from './pages/ReportIssue';
import ViewIssues from './pages/ViewIssues';
import UserDashboard from './pages/UserDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';

function App() {

  // const [userRole, setUserRole] = useState('user');
  const userRole = "authority"

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/" element={<Home />} /> {/* Set Home as default */}
        <Route path='/issues' element={<ViewIssues />}/>
        {/* Conditional Route for User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            userRole === 'user' ? (
              <UserDashboard />
            ) : (
              <Navigate to="/authority-dashboard" replace />
            )
          }
        />
        <Route
          path="/authority-dashboard"
          element={
            userRole === 'authority' ? (
              <AuthorityDashboard />
            ) : (
              <Navigate to="/user-dashboard" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
