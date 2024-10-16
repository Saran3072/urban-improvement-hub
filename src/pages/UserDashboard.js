import React, { useEffect, useState } from 'react';
import '../assets/UserDashboard.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserDashboard = ({ userEmail }) => {
    const [userStats, setUserStats] = useState({ totalReports: 0, resolvedReports: 0, unresolvedReports: 0 });
    const [reportHistory, setReportHistory] = useState([]);
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        // Only call this function if userEmail is defined
        console.log("User email:", userEmail);
        if (userEmail) {
        console.log("User email:", userEmail);
          const fetchUserDashboardData = async () => {
            try {
              const response = await fetch(`http://localhost:8000/user-dashboard?email=${userEmail}`);
              if (response.ok) {
                const data = await response.json();
                setUserStats(data.userStats);
                setReportHistory(data.reportHistory);
                setNotifications(data.notifications);
              } else {
                console.error("Failed to fetch user dashboard data");
              }
            } catch (error) {
              console.error("Error fetching user dashboard data:", error);
            }
          };
    
          fetchUserDashboardData();
        }
      }, [userEmail]);

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
