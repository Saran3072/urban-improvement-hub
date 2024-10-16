import React, { useState } from 'react';
import '../assets/ViewIssues.css';

const issuesData = [
  { id: 1, title: "Pothole on Main Street", category: "Roads", location: "Downtown", seriousness: "Moderate", description: "Large pothole causing damage to vehicles.", date: "2024-10-10" },
  { id: 2, title: "Broken Streetlight", category: "Electricity", location: "East Side", seriousness: "Low", description: "Streetlight not functioning for over a week.", date: "2024-10-11" },
  { id: 3, title: "Water Leakage in Park", category: "Water Supply", location: "Central Park", seriousness: "High", description: "Significant water leakage causing flooding in the park.", date: "2024-10-12" },
  { id: 4, title: "Overflowing Garbage Bin", category: "Waste Management", location: "West End", seriousness: "Moderate", description: "Garbage bin overflowing, creating an unpleasant smell.", date: "2024-10-13" },
  { id: 5, title: "Power Outage in Neighborhood", category: "Electricity", location: "Southville", seriousness: "Critical", description: "Power outage affecting multiple blocks, needs immediate attention.", date: "2024-10-13" },
  { id: 6, title: "Broken Traffic Signal", category: "Roads", location: "5th Avenue", seriousness: "High", description: "Traffic signal not working, causing traffic congestion.", date: "2024-10-14" },
  { id: 7, title: "Water Contamination Alert", category: "Water Supply", location: "North District", seriousness: "Critical", description: "Reports of contaminated water, posing health risks.", date: "2024-10-14" },
  { id: 8, title: "Unattended Construction Debris", category: "Waste Management", location: "Greenview", seriousness: "Low", description: "Construction debris left on the sidewalk, partially blocking the path.", date: "2024-10-15" },
  { id: 9, title: "Road Erosion Near School", category: "Roads", location: "Elm Street", seriousness: "Moderate", description: "Road erosion near school posing risk for vehicles and pedestrians.", date: "2024-10-16" },
];

const seriousnessOrder = {
  "Critical": 4,
  "High": 3,
  "Moderate": 2,
  "Low": 1
};

const ViewIssues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc"); // Default to Critical to Low

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
            <p><strong>Date:</strong> {issue.date}</p>
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
