import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import ReportIssue from './pages/ReportIssue';
import ViewIssues from './pages/ViewIssues';
import UserDashboard from './pages/UserDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';

function App() {
  const [userRole, setUserRole] = useState('user');  // This is either 'user' or 'authority'
  const [userEmail, setUserEmail] = useState('');

  return (
    <Router>
      <Navbar userRole={userRole}/>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Login setUserRole={setUserRole} setUserEmail={setUserEmail} />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} setUserEmail={setUserEmail} />} />
        <Route path="/report" element={<ReportIssue userEmail={userEmail} />} />
        <Route path="/home" element={<Home userRole={userRole}/>} />
        <Route path="/issues" element={<ViewIssues />} />
        <Route path="/user-dashboard" element={<UserDashboard userEmail={userEmail} />} />
        <Route path="/authority-dashboard" element={<AuthorityDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
