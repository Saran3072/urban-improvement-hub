import React, { useState, useEffect } from 'react';
import '../assets/ViewIssues.css';

const seriousnessOrder = {
  "Critical": 4,
  "High": 3,
  "Moderate": 2,
  "Low": 1
};

const ViewIssues = () => {
  const [issuesData, setIssuesData] = useState([]); // State to store issues from backend
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc"); // Default to Critical to Low

  // Fetch issues data from the backend on component mount
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("http://localhost:8000/reports");
        if (response.ok) {
          const data = await response.json();
          setIssuesData(data); // Set the fetched data to issuesData state
        } else {
          console.error("Failed to fetch issues");
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  // Sort and filter issues
  const sortedIssues = [...issuesData]
    .filter(issue =>
      (filteredCategory === "All" || issue.category === filteredCategory) &&
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === "desc"
        ? seriousnessOrder[b.seriousness] - seriousnessOrder[a.seriousness]
        : seriousnessOrder[a.seriousness] - seriousnessOrder[b.seriousness];
    });

  return (
    <div className="view-issues-container">
      {/* Search, Filter, and Sort Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All Categories</option>
          <option value="Roads">Roads</option>
          <option value="Electricity">Electricity</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Waste Management">Waste Management</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="desc">Critical to Low</option>
          <option value="asc">Low to Critical</option>
        </select>
      </div>

      {/* Issues List Section */}
      <div className="issues-list">
        {sortedIssues.map(issue => (
          <div 
            key={issue.id} 
            className="issue-card"
            style={{ borderLeftColor: getBorderColor(issue.seriousness) }}
          >
            <h3>{issue.title}</h3>
            <p><strong>Category:</strong> {issue.category}</p>
            <p><strong>Location:</strong> {issue.location}</p>
            <p><strong>Seriousness:</strong> {issue.seriousness}</p>
            <p><strong>Details:</strong> {issue.date}</p>
            <p>{issue.description}</p>
            <button className="view-details-button">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine border color based on seriousness
const getBorderColor = (seriousness) => {
  switch (seriousness) {
    case "Low":
      return "#28a745"; // Green
    case "Moderate":
      return "#ffc107"; // Yellow
    case "High":
      return "#fd7e14"; // Orange
    case "Critical":
      return "#dc3545"; // Red
    default:
      return "#007bff";
  }
};

export default ViewIssues;
