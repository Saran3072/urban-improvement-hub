import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import ReportIssue from './pages/ReportIssue';
import ViewIssues from './pages/ViewIssues';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/" element={<Home />} /> {/* Set Home as default */}
        <Route path='/issues' element={<ViewIssues />}/>
      </Routes>
    </Router>
  );
}

export default App;
