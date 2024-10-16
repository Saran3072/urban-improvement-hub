import React from 'react';
import '../assets/UserDashboard.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserDashboard = () => {
  // Dummy data for user stats and report history
  const userStats = {
    totalReports: 12,
    resolvedReports: 8,
    unresolvedReports: 4,
  };

  const reportHistory = [
    {
      id: 1,
      title: "Pothole on Main Street",
      category: "Roads",
      date: "2024-10-10",
      status: "Resolved",
    },
    {
      id: 2,
      title: "Broken Streetlight",
      category: "Electricity",
      date: "2024-10-11",
      status: "Unresolved",
    },
    {
      id: 3,
      title: "Water Leakage in Park",
      category: "Water Supply",
      date: "2024-10-12",
      status: "Resolved",
    },
    {
      id: 4,
      title: "Overflowing Garbage Bin",
      category: "Waste Management",
      date: "2024-10-13",
      status: "Unresolved",
    },
  ];

  const notifications = [
    "Your report 'Pothole on Main Street' has been marked as resolved.",
    "A new report 'Water Contamination Alert' has been added in your area.",
  ];

  // Data for Pie Chart
  const pieData = {
    labels: ['Resolved', 'Unresolved'],
    datasets: [
      {
        data: [userStats.resolvedReports, userStats.unresolvedReports],
        backgroundColor: ['#28a745', '#dc3545'], // Green for Resolved, Red for Unresolved
        hoverBackgroundColor: ['#218838', '#c82333'],
      },
    ],
  };

  return (
    <div className="user-dashboard-container">
      {/* User Statistics Section with Pie Chart */}
      <div className="user-stats">
        <h2>User Statistics</h2>
        <div className="stats-charts">
          <div className="stat-card">
            <h3>Total Reports</h3>
            <p>{userStats.totalReports}</p>
          </div>
          <div className="pie-chart-container">
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Report History Section */}
      <div className="report-history">
        <h2>Your Report History</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportHistory.map((report) => (
              <tr key={report.id}>
                <td>{report.title}</td>
                <td>{report.category}</td>
                <td>{report.date}</td>
                <td>{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notifications Section */}
      <div className="notifications">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
