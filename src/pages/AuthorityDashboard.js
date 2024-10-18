import React, { useEffect, useState } from 'react';
import '../assets/AuthorityDashboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AuthorityDashboard = () => {
  const [globalStats, setGlobalStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    unresolvedReports: 0,
    highPriorityReports: 0,
  });
  const [issuesByCategory, setIssuesByCategory] = useState([]);
  const [issuesBySeriousness, setIssuesBySeriousness] = useState([]);
  const [issueList, setIssueList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://urban-backend-rs5i.onrender.com/authority-dashboard");
        if (response.ok) {
          const data = await response.json();
          setGlobalStats(data.globalStats);
          setIssuesByCategory(data.issuesByCategory);
          setIssuesBySeriousness(data.issuesBySeriousness);
          setIssueList(data.issueList);
        } else {
          console.error("Failed to fetch authority dashboard data");
        }
      } catch (error) {
        console.error("Error fetching authority dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const handleResolveIssue = async (issueId) => {
    try {
      const response = await fetch(`https://urban-backend-rs5i.onrender.com/resolve-issue/${issueId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedIssueList = issueList.map((issue) =>
          issue.id === issueId ? { ...issue, status: 'Resolved' } : issue
        );
        setIssueList(updatedIssueList);
        alert("Issue resolved successfully");
      } else {
        console.error("Failed to resolve issue");
      }
    } catch (error) {
      console.error("Error resolving issue:", error);
    }
  };

  // Prepare data for charts
  const pieData = {
    labels: issuesByCategory.map(item => item.category),
    datasets: [
      {
        data: issuesByCategory.map(item => item.count),
        backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545'],
        hoverBackgroundColor: ['#0056b3', '#e0a800', '#218838', '#c82333'],
      },
    ],
  };

  const barData = {
    labels: issuesBySeriousness.map(item => item.seriousness),
    datasets: [
      {
        label: 'Issue Count by Seriousness Level',
        data: issuesBySeriousness.map(item => item.count),
        backgroundColor: ['#28a745', '#ffc107', '#fd7e14', '#dc3545'],
      },
    ],
  };

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
                <td>{issue.seriousness}</td>
                <td>{issue.status}</td>
                <td>
                  {issue.status !== 'Resolved' && (
                    <button className="resolve-button" onClick={() => handleResolveIssue(issue.id)}>
                      Resolve
                    </button>
                  )}
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
