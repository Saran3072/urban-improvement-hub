import React from 'react';
import '../assets/AuthorityDashboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AuthorityDashboard = () => {
  // Dummy data for global statistics
  const globalStats = {
    totalReports: 150,
    resolvedReports: 90,
    unresolvedReports: 60,
    highPriorityReports: 25,
  };

  // Dummy data for charts
  const pieData = {
    labels: ['Roads', 'Electricity', 'Water Supply', 'Waste Management'],
    datasets: [
      {
        data: [45, 20, 35, 50], // Sample category data
        backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545'],
        hoverBackgroundColor: ['#0056b3', '#e0a800', '#218838', '#c82333'],
      },
    ],
  };

  const barData = {
    labels: ['Low', 'Moderate', 'High', 'Critical'],
    datasets: [
      {
        label: 'Issue Count by Seriousness Level',
        data: [30, 40, 50, 30], // Sample data
        backgroundColor: ['#28a745', '#ffc107', '#fd7e14', '#dc3545'],
      },
    ],
  };

  const issueList = [
    { id: 1, title: "Pothole on Main Street", category: "Roads", date: "2024-10-10", seriousness: "Moderate", status: "Unresolved" },
    { id: 2, title: "Water Leakage in Park", category: "Water Supply", date: "2024-10-12", seriousness: "High", status: "Resolved" },
    { id: 3, title: "Power Outage", category: "Electricity", date: "2024-10-13", seriousness: "Critical", status: "Unresolved" },
    { id: 4, title: "Garbage Overflow", category: "Waste Management", date: "2024-10-14", seriousness: "Low", status: "Resolved" },
  ];

  return (
    <div className="admin-dashboard-container">
      {/* Global Statistics Section */}
      <div className="global-stats">
        <h2>City-Wide Statistics</h2>
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Reports</h3>
            <p>{globalStats.totalReports}</p>
          </div>
          <div className="stat-card">
            <h3>Resolved Reports</h3>
            <p>{globalStats.resolvedReports}</p>
          </div>
          <div className="stat-card">
            <h3>Unresolved Reports</h3>
            <p>{globalStats.unresolvedReports}</p>
          </div>
          <div className="stat-card">
            <h3>High-Priority Reports</h3>
            <p>{globalStats.highPriorityReports}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h3>Issues by Category</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart-container">
          <h3>Issues by Seriousness Level</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      {/* Issues Management Table */}
      <div className="issues-management">
        <h2>Issues Management</h2>
        <table className="issues-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Seriousness</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issueList.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.title}</td>
                <td>{issue.category}</td>
                <td>{issue.date}</td>
                <td>{issue.seriousness}</td>
                <td>{issue.status}</td>
                <td>
                  <button className="resolve-button">Resolve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
